package org.springframework.samples.petclinic.web;

import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.service.ClinicService;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Locale;

import static org.junit.Assert.assertEquals;

/**
 * Test class for {@link PetTypeFormatter}
 *
 * @author Colin But
 */
@ExtendWith(MockitoExtension.class)
public class PetTypeFormatterTests {

  @Mock
  private ClinicService clinicService;

  private PetTypeFormatter petTypeFormatter;

  @BeforeEach
  public void setup() {
    petTypeFormatter = new PetTypeFormatter(clinicService);
  }

  @Test
  public void testPrint() {
    PetType petType = new PetType();
    petType.setName("Hamster");
    String petTypeName = petTypeFormatter.print(petType, Locale.ENGLISH);
    assertEquals("Hamster", petTypeName);
  }

  @Test
  public void shouldParse() throws ParseException {
    Mockito.when(clinicService.findPetTypes()).thenReturn(makePetTypes());
    PetType petType = petTypeFormatter.parse("Bird", Locale.ENGLISH);
    assertEquals("Bird", petType.getName());
  }

  /*@Test(expected = ParseException.class)
  public void shouldThrowParseException() throws ParseException {
    Mockito.when(clinicService.findPetTypes()).thenReturn(makePetTypes());
    petTypeFormatter.parse("Fish", Locale.ENGLISH);
  }*/

  /**
   * Helper method to produce some sample pet types just for test purpose
   *
   * @return {@link Collection} of {@link PetType}
   */
  private Collection<PetType> makePetTypes() {
    Collection<PetType> petTypes = new ArrayList<>();
    petTypes.add(new PetType() {
      {
        setName("Dog");
      }
    });
    petTypes.add(new PetType() {
      {
        setName("Bird");
      }
    });
    return petTypes;
  }

}
