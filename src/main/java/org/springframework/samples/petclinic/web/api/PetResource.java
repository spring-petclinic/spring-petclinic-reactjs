/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.samples.petclinic.web.api;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Nils Hartmann
 */
@RestController
public class PetResource extends AbstractResourceController {

	private final Logger				logger	= LoggerFactory.getLogger(getClass());

	private final ClinicService	clinicService;

	@Autowired
	public PetResource(ClinicService clinicService) {
		this.clinicService = clinicService;
	}

	@GetMapping("/pettypes")
	Object getPetTypes() {
		return "Welcome";
	}

	@PostMapping("/owners/{ownerId}/pets")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void addNewPet(final @PathVariable("ownerId") int ownerId, final @Valid @RequestBody PetRequest petRequest,
			final BindingResult bindingResult) {

		logger.info("PetRequest: {}", petRequest);

		if (bindingResult.hasErrors()) {
			throw new InvalidRequestException("Submitted Pet invalid", bindingResult);
		}

		Pet pet = new Pet();
		Owner owner = this.clinicService.findOwnerById(ownerId);
		if (owner == null) {
			throw new BadRequestException("Owner with Id '" + ownerId + "' is unknown.");
		}
		owner.addPet(pet);

		save(pet, petRequest);
	}

	@PutMapping("/owners/{ownerId}/pets/{petId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void processUpdateForm(final @PathVariable("petId") int petId, final @Valid @RequestBody PetRequest petRequest, final BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			throw new InvalidRequestException("Submitted Pet invalid", bindingResult);
		}

		save(clinicService.findPetById(petId), petRequest);
	}

	private void save(Pet pet, PetRequest petRequest) {

		pet.setName(petRequest.getName());
		pet.setBirthDate(petRequest.getBirthDate());

		for (PetType petType : clinicService.findPetTypes()) {
			if (petType.getId() == petRequest.getTypeId()) {
				pet.setType(petType);
				break;
			}
		}

		clinicService.savePet(pet);
	}

	@GetMapping("/owners/*/pets/{petId}")
	public PetRequest findPet(@PathVariable("petId") int petId) {
		final Pet pet = this.clinicService.findPetById(petId);

		final PetRequest petRequest = new PetRequest();
		petRequest.setId(pet.getId());
		petRequest.setBirthDate(pet.getBirthDate());
		petRequest.setName(pet.getName());
		petRequest.setTypeId(pet.getType().getId());

		return petRequest;
	}

	// @Getter
	// static class PetDetails {
	//
	// long id;
	// String name;
	// String owner;
	// @DateTimeFormat(pattern = "yyyy-MM-dd")
	// Date birthDate;
	// PetType type;
	//
	// PetDetails(Pet pet) {
	// this.id = pet.getId();
	// this.name = pet.getName();
	// this.owner = pet.getOwner().getFirstName() + " " +
	// pet.getOwner().getLastName();
	// this.birthDate = pet.getBirthDate();
	// this.type = pet.getType();
	// }
	//
	// }

}