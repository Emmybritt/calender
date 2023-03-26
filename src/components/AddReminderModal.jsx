import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import { Modal, Button, Select, Textarea, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { v4 as uuidv4 } from "uuid";

import DeleteIcon from "../assets/delete-icon.jpeg";
import { showToastMessage } from "../helper";

const AddReminderModal = ({
  opened,
  setOpen,
  handleCloseModal,
  handleAddReminder,
  selectedReminder,
  isEditReminder,
  handleEditReminder,
  setSelectedReminder,
  handleDeleteReminder,
  selectedReminderWeather,
  fetchCityWeather,
  cities,
}) => {
  const [form, setForm] = useState({});
  const [errMsg, setErrMsg] = useState({});
  function handleChangeInput(name, value) {
    if (!value) {
      if (isEditReminder) {
        setSelectedReminder((prev) => ({
          ...prev,
          [name]: "",
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
      return setErrMsg((prev) => ({
        ...prev,
        [name]: `${name} field is required...`,
      }));
    }
    setErrMsg((prev) => ({
      ...prev,
      [name]: "",
    }));
    if (isEditReminder) {
      return setSelectedReminder((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmittReminder() {
    if (isEditReminder) {
      handleEditReminder(selectedReminder);
      return setOpen(false);
    }
    if (!form.title)
      return showToastMessage("The title of the reminder is required...");
    if (!form.desc)
      return showToastMessage("Enter a description of your reminder...");
    if (!form.date)
      return showToastMessage("The Date of your reminder is required...");
    setForm({});

    handleAddReminder({ ...form, id: uuidv4() });
    setOpen(false);
  }

  function handleGetWeatherForcast(value) {
    return fetchCityWeather(value);
  }

  function handleGetCityName() {
    let selectedCity = "";
    if (isEditReminder) {
      if (!selectedReminder.city) return (selectedCity = "-");
      const filteredCity = cities.filter(
        (city) => city.value === selectedReminder.city
      );
      selectedCity = filteredCity[0].label;
    } else {
      if (!form.city) return (selectedCity = "-");
      const filteredCity = cities.filter((city) => city.value === form.city);
      selectedCity = filteredCity[0].label;
    }
    return selectedCity;
  }

  return (
    <>
      <ToastContainer />
      <Modal
        opened={opened}
        onClose={handleCloseModal}
        withCloseButton={false}
        styles={{
          body: {
            height: "520px",
          },
        }}
      >
        <div>
          <h3>Add New Reminder</h3>
          <TextInput
            label="Title"
            withAsterisk
            value={isEditReminder ? selectedReminder.title : form.title || ""}
            onChange={(e) => handleChangeInput("title", e.target.value)}
            placeholder="Remind me to..."
          />
          <span data-testid="error" className="error">
            {errMsg.title && errMsg.title}
          </span>

          <Textarea
            label="Description"
            value={isEditReminder ? selectedReminder.desc : form.desc}
            onChange={(e) => handleChangeInput("desc", e.target.value)}
            placeholder="Reminder Description"
            withAsterisk
          />

          <span data-testid="error" className="error">
            {errMsg.desc && errMsg.desc}
          </span>

          <DateTimePicker
            withAsterisk
            value={isEditReminder ? selectedReminder.date : form.date}
            onChange={(e) => handleChangeInput("date", e)}
            placeholder="Pick date and time"
            label="Select Date And Time"
            maw={450}
            mx="auto"
          />
          <span data-testid="error" className="error">
            {errMsg.date && errMsg.date}
          </span>

          <Select
            onChange={(e) => {
              handleChangeInput("city", e);
              handleGetWeatherForcast(e);
            }}
            data={cities}
            placeholder="Select city"
            searchable
            nothingFound="Cannot find city..."
            clearable
            allowDeselect
            label="Select city"
            value={isEditReminder ? selectedReminder.city : form.city}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Button onClick={handleCloseModal} bg="red" title="Close">
            Close
          </Button>
          <div className="action__btn-container">
            {isEditReminder && (
              <img
                onClick={() => handleDeleteReminder(selectedReminder.id)}
                style={{ height: 20, width: 20, marginRight: 9 }}
                src={DeleteIcon}
                alt="delete-icon"
              />
            )}

            <Button title="Save" onClick={handleSubmittReminder}>
              {isEditReminder ? "Update Reminder" : "Save Reminder"}
            </Button>
          </div>
        </div>
        {!!form.city | (!!selectedReminder.city !== "" && isEditReminder) ? (
          <>
            {selectedReminderWeather !== "" && (
              <div className="weather__container">
                <h3>{handleGetCityName()}</h3>
                <h4>Weather condition</h4>
                <h1>
                  {selectedReminderWeather || 0} <sup>0</sup> C
                </h1>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default AddReminderModal;
