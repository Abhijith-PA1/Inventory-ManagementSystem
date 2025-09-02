import React, { createContext, useState } from "react";
export const addSettingResponseContext = createContext();
export const deleteSettingResponseContext = createContext();
export const addResponseContext = createContext();
export const deleteResponseContext = createContext();
export const editResponseContext = createContext();

function ContextShare({ children }) {
  const [addSettingResponse, setAddSettingResponse] = useState("");
  const [deleteSettingResponse, setDeleteSettingResponse] = useState("");
  const [addResponse, setAddResponse] = useState("");
  const [deleteResponse, setDeleteResponse] = useState("");
  const [editResponse, setEditResponse] = useState("");
  return (
    <>
      <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
        <deleteResponseContext.Provider
          value={{ deleteResponse, setDeleteResponse }}
        >
          <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
            <deleteSettingResponseContext.Provider
              value={{ deleteSettingResponse, setDeleteSettingResponse }}
            >
              <addSettingResponseContext.Provider
                value={{ addSettingResponse, setAddSettingResponse }}
              >
                {children}
              </addSettingResponseContext.Provider>
            </deleteSettingResponseContext.Provider>
          </addResponseContext.Provider>
        </deleteResponseContext.Provider>
      </editResponseContext.Provider>
    </>
  );
}

export default ContextShare;
