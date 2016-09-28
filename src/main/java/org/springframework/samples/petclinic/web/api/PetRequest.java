package org.springframework.samples.petclinic.web.api;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;
import org.joda.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class PetRequest {
  @JsonFormat(pattern = "yyyy/MM/dd")
  private LocalDate birthDate;
  @Size(min = 1)
  private String name;
  @Min(1)
  Integer typeId;
  
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
	@Override
	public String toString() {
		return "PetRequest [birthDate=" + birthDate + ", name=" + name + ", typeId=" + typeId + "]";
	}
  
  
}
