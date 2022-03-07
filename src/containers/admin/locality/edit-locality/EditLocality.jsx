import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import FormLocalityComponent from "../../../../components/admin/locality/form-locality/FormLocalityComponent"
import { editLocality, getLocality } from "../../../../services/services"

export default function EditLocality() {
  let id = window.location.href.split("/").pop()
  const history = useHistory()

  const formObj = Object.freeze({
    name: "",
  })

  const errorObj = Object.freeze({
    error: false,
    name: "",
  })

  const [error, setError] = useState(errorObj)
  const [formState, setFormState] = useState(formObj)
  const [submitError, setSubmitError] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    editLocality(id, { name: formState?.name })
      .then(res => {
        if (res?.error) {
          setSubmitError(res.error)
        } else {
          setResponse(res.data)
          history.push("/locality")
        }
      })
      .catch(error => setError(error))
  }

  const handleChange = e => {
    const name = e.target?.name
    const value = e?.target?.value?.trim()
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }))
    // updateErrorState(name, value)
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    getLocality(id)
      .then(res =>
        setFormState(prev => ({
          ...prev,
          name: res?.data?.name,
        }))
      )
      .catch(error => setError(error))
  }

  return (
    <FormLocalityComponent
      response={response}
      error={error}
      submitError={submitError}
      formState={formState}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      updateBool={true}
    />
  )
}
