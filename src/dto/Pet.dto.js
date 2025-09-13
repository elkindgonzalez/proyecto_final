// src/dto/Pet.dto.js
export default class PetDTO {
  static getPetInputFrom = (pet) => {
    return {
      name: pet.name || '',
      // 👇 convertimos "type" en "specie"
      specie: pet.type || pet.specie || '',
      // 👇 si viene "age", calculamos birthDate aproximado
      birthDate: pet.birthDate
        ? new Date(pet.birthDate)
        : pet.age !== undefined
        ? new Date(new Date().setFullYear(new Date().getFullYear() - pet.age))
        : new Date('2000-12-30'),
      image: pet.image || '',
      adopted: false,
    };
  };
}
