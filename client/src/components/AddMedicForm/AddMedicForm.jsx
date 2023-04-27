import React, { useState } from "react";
import styles from "./AddMedicForm.module.css";
import medicForm from "../../images/medico-form.jpg";
import Swal from "sweetalert2";
import axios from "axios";

function isValidURL(urlString) {
  if (urlString === "") return true;

  // Input check
  if (!urlString) return false;

  let regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  if (regexp.test(urlString)) {
    // Tests if the end of the string is .jpg
    if (urlString.endsWith(".jpg")) {
      return true;
    } else return false;
  } else return false;
}

function validate(inputs) {
  let errors = {};
  const regex = /^[a-zA-Z ]+$/;
  if (!regex.test(inputs.full_name)) {
    errors.full_name = "Nombre NO válido";
  } else if (inputs.full_name.length > 30) {
    errors.full_name = "Debe ingresar un nombre más corto";
  } else if (inputs.age < 18 || inputs.age > 80) {
    errors.age = "Debe ingresar una edad mayor o igual que 18 y menor que 80";
  } else if (!isValidURL(inputs.image)) {
    errors.image = "La URL no es válida o no es una imagen JPG";
  }

  return errors;
}

export default function AddMedicForm() {
  const [userDate, setUserDate] = useState({
    idUser: "", // number
    full_name: "",
    dni: "", // number
    age: "", // number
    phone: "", // number
    address: "",
    image: "",
    specialities: [],
    gender: "",
    code: "", // number
    birthday: "",
    day: [],
    is_morning: false,
    is_evening: false,
  });

  const [userSpecialities, setUserSpecialities] = useState([]);

  const [userDay, setUserDay] = useState([]);

  const [image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "images");
    data.append("cloud_name", "dmpzc4arr");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmpzc4arr/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    setImage(file.url);
    setLoading(false);

    if (e.target.name === "image") {
      setUserDate({ ...userDate, ["image"]: file.url });
    }
  };

  const handleChangeSpecialities = (e) => {
    const { name, value } = e.target;

    let newValues = [...userSpecialities, value];

    setUserSpecialities(newValues);

    setUserDate({ ...userDate, specialities: newValues });
  };

  // Función para actualizar el estado según si trabaja de día o de tarde
  const handleWorkTimeChange = (workTime) => {
    if (workTime === "morning") {
      setUserDate((prevUserDate) => ({
        ...prevUserDate,
        is_morning: true,
        is_evening: false,
      }));
    } else if (workTime === "evening") {
      setUserDate((prevUserDate) => ({
        ...prevUserDate,
        is_morning: false,
        is_evening: true,
      }));
    }
  };

  const handleChangeCheckBox = (e) => {
    e.persist(); // Necesario para manterner el valor de 'e'

    let newValues;
    if (e.target.checked) {
      // Si se ha marcado el checkbox
      newValues = [...userDay, e.target.value];
    } else {
      // Si no se ha marcado el checkbox
      newValues = userDay.filter((v) => v !== e.target.value);
    }
    setUserDay(newValues);
    setUserDate({ ...userDate, day: newValues });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "dni" ||
      name === "age" ||
      name === "code" ||
      name === "idUser" ||
      name === "phone"
    ) {
      // Verificar si el campo es dni, age o code
      setUserDate({ ...userDate, [name]: Number(value) }); // Convertir el valor a número antes de establecerlo en el estado
    } else if (name === "specialities") {
      const specialtiesArray = userDate.specialities; // Obtener el valor actual del array "specialities"
      const newSpeciality = value;
      const updatedSpecialities = [...specialtiesArray, newSpeciality]; // Agregar el nuevo valor ingresado al final del array
      setUserDate((prevState) => ({
        ...prevState,
        specialities: updatedSpecialities,
      })); // Actualizar el estado "userDate" con el nuevo valor del array "specialities"
    } else {
      setUserDate({ ...userDate, [name]: value });
    }
    setErrors(validate({ ...userDate, [name]: value }));
  };

  const [errors, setErrors] = useState({
    full_name: "",
    age: "",
    phone: "",
    address: "",
    image: "",
  });

  let arraySpecialists = [
    "Clínica Médica",
    "Traumatología",
    "Neurología",
    "Otorrinolaringología",
    "Pediatría",
    "Psiquiatría",
    "Endocrinología",
    "Cardiología",
  ];

  let arrayDias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviar la solicitud POST a la API
      const response = await axios.post("doctor/", userDate);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Su médico ah sido creado.",
      showConfirmButton: false,
      timer: 800,
    });

    console.log(userDate);
  };

  return (
    <div className={styles.container__medic}>
      {!image ? (
        <img src={medicForm} alt="" />
      ) : (
        <img src={image} style={{ width: "17rem", height: "25rem" }}></img>
      )}

      <div className={styles.container__medicForm}>
        <form onSubmit={handleSubmit}>

        <input
            type="number"
            name="idUser"
            placeholder="idUser"
            autoComplete="nop"
            required
            onChange={handleInputChange}
          />


          <input
            type="text"
            name="full_name"
            placeholder="Nombre Completo"
            autoComplete="nop"
            required
            onChange={handleInputChange}
            value={userDate.full_name}
          />
          <input
            type="number"
            name="code"
            placeholder="Code"
            autoComplete="nop"
            required
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="birthday"
            autoComplete="nop"
            required
            onChange={handleInputChange}
            value={userDate.birthday}
          />

          <input
            type="number"
            name="dni"
            placeholder="DNI"
            autoComplete="nop"
            maxlength="8"
            minlength="8"
            required
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Edad"
            autoComplete="nop"
            max={80}
            required
            onChange={handleInputChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Cel. Ej: (123) 456-7890"
            autoComplete="nop"
            min={10}
            required
            onChange={handleInputChange}
            value={userDate.phone}
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            autoComplete="nop"
            required
            onChange={handleInputChange}
            value={userDate.address}
          />

          <input type="file" name="image" required onChange={uploadImage} />

          <div className={styles.container__selects}>
            <select
              name="specialities"
              onChange={handleChangeSpecialities}
              value={userDate.specialities}
              required
            >
              <option disabled value="">
                Seleccionar especialidades
              </option>
              {arraySpecialists.map((specialist) => (
                // con estos métodos, sacamos las mayusculas, los espacios y los acentos.
                <option value={specialist.toLowerCase()}>{specialist}</option>
              ))}
            </select>

            <select
              name="gender"
              onChange={(e) =>
                setUserDate({ ...userDate, gender: e.target.value })
              }
              value={userDate.gender}
              required
            >
              <option disabled value="">
                Seleccionar género
              </option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="no-binario">No Binario</option>
            </select>
              </div>

            <div className={styles.container__days}>
              {arrayDias.map((dias) => (
                <div key={dias}>
                  <input
                    type="checkbox"
                    name="day"
                    value={dias}
                    onChange={handleChangeCheckBox}
                  />{" "}
                  {dias}
                  <br />
                </div>
              ))}
            </div>

            <div className={styles.container__radioButton}>
              {/* Input para seleccionar si trabaja de día o de tarde */}
              <input
                type="radio"
                name="workTime"
                value="morning"
                onChange={() => handleWorkTimeChange("morning")}
              />
              Trabaja de mañana
              <input
                type="radio"
                name="workTime"
                value="evening"
                onChange={() => handleWorkTimeChange("evening")}
              />
              Trabaja de tarde
            </div>

          {}
          <button className={styles.btn__form} type="submit">
            Crear Médico
          </button>
        </form>

        {errors.full_name && (
          <p className={styles.errors}>{errors.full_name}</p>
        )}
        {errors.age && <p className={styles.errors}>{errors.age}</p>}
        {errors.image && <p className={styles.errors}>{errors.image}</p>}
      </div>
    </div>
  );
}
