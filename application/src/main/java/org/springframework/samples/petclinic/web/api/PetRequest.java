package org.springframework.samples.petclinic.web.api;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class PetRequest {
	private Integer		id;
	@JsonFormat(pattern = "yyyy/MM/dd")
	@NotNull
	private LocalDate birthDate;
	@Size(min = 2, max = 14 )
	private String		name;
	
	Integer	typeId;  

	
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
