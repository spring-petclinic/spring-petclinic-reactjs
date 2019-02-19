package org.springframework.samples.petclinic.web.api;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.LinkedList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.anyObject;
import static org.mockito.Mockito.doAnswer;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(OwnerResource.class)
@MockBean(UserDetailsService.class)
public class OwnerResourceTests {

  @Autowired
  private MockMvc mvc;

  @MockBean
  ClinicService clinicService;

  @Test
  public void shouldNotGetOwnerById() throws Exception {

    mvc.perform(get("/api/owners/20") //
        .accept(MediaType.APPLICATION_JSON)) //
        .andExpect(status().is4xxClientError()) //
        .andExpect(content().contentType("application/json")); //

  }

  @Test
  public void shouldGetOwnerById() throws Exception {
    given(clinicService.findOwnerById(1)).willReturn(setupOwners().get(1));

    mvc.perform(get("/api/owners/1") //
        .accept(MediaType.APPLICATION_JSON)) //
        .andExpect(status().isOk()) //
        .andExpect(content().contentType("application/json;charset=UTF-8")) //
        .andExpect(jsonPath("$.id").value(1)) //
        .andExpect(jsonPath("$.city").value("Mainz")) //
        .andExpect(jsonPath("$.lastName").value("Mueck")); //
  }

  @Test
  public void shouldFindOwners() throws Exception {
    final List<Owner> owners = setupOwners();
    owners.remove(1);
    given(clinicService.findOwnerByLastName("mueller")).willReturn(owners);
    mvc.perform(get("/api/owners/list/?lastName=mueller") //
        .accept(MediaType.APPLICATION_JSON)) //
        .andExpect(status().isOk())
        .andExpect(content().contentType("application/json;charset=UTF-8")) //
        .andExpect(jsonPath("$.[0].id").value(0))
        .andExpect(jsonPath("$.[1].id").value(2)); //
  }


  @Test
  public void shouldCreateOwner() throws Exception {

    doAnswer(new Answer<Void>() {
      public Void answer(InvocationOnMock invocation) {
        Owner receivedOwner = (Owner) invocation.getArguments()[0];
        receivedOwner.setId(666);
        return null;
      }
    }).when(clinicService).saveOwner((Owner) anyObject());

    final Owner newOwner = setupOwners().get(0);
    newOwner.setId(null);

    ObjectMapper mapper = new ObjectMapper();
    String ownerAsJsonString = mapper.writeValueAsString(newOwner);
    newOwner.setId(666);
    String newOwnerAsJsonString =
        mapper.writeValueAsString(newOwner);

    mvc.perform(post("/api/owners") //
        .content(ownerAsJsonString).accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)) //
        .andExpect(status().isCreated())
        .andExpect(content().json(newOwnerAsJsonString))
    ;
  }

  @Test
  public void shouldReturnBindingErrors() throws Exception {

    final Owner newOwner = setupOwners().get(0);
    newOwner.setId(null);
    newOwner.setLastName(null);

    ObjectMapper mapper = new ObjectMapper();
    String ownerAsJsonString = mapper.writeValueAsString(newOwner);

    mvc.perform(post("/api/owners") //
        .content(ownerAsJsonString).accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)) //
        .andExpect(status().isUnprocessableEntity())
        .andExpect(content().contentType("application/json")) //
        .andExpect(jsonPath("$.fieldErrors.lastName").isNotEmpty()) //

    ;
  }

  private List<Owner> setupOwners() {

    final List<Owner> owners = new LinkedList<Owner>();

    Owner owner = new Owner();
    owner.setId(0);
    owner.setAddress("My Street 123");
    owner.setCity("Hamburg");
    owner.setFirstName("Klaus-Dieter");
    owner.setLastName("Mueller");
    owner.setTelephone("1234567");
    owners.add(owner);

    owner = new Owner();
    owner.setId(1);
    owner.setAddress("Hier und Da 123");
    owner.setCity("Mainz");
    owner.setFirstName("Hein");
    owner.setLastName("Mueck");
    owner.setTelephone("765432");
    owners.add(owner);

    owner = new Owner();
    owner.setId(2);
    owner.setAddress("Lange Reihe");
    owner.setCity("Hamburg");
    owner.setFirstName("Peter");
    owner.setLastName("Mueller");
    owner.setTelephone("445566");
    owners.add(owner);

    return owners;

  }
}