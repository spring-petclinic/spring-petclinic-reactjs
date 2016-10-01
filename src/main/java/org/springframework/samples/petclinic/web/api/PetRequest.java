package org.springframework.samples.petclinic.web.api;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.joda.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PetRequest {
	private Integer		id;
	@JsonFormat(pattern = "yyyy/MM/dd")
	private LocalDate	birthDate;
	@Size(min = 1)
	private String		name;
	@Min(1)
	Integer						typeId;

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	@JsonProperty("isNew")
	public boolean isNew() {
		return this.id == null;
	}

	@Override
	public String toString() {
		return "PetRequest [id=" + id + ", birthDate=" + birthDate + ", name=" + name + ", typeId=" + typeId + "]";
	}

}
