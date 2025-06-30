'use client'
import { createContext, useState } from "react";

export type ModalObject = {
  name: string,
  data: any,
  state: boolean
}

type ModalProviderValueType = {
  openModal?: ModalObject
  handleToggle?: (payload: ModalObject) => void
  handleClose?: () => void
}

const ModalContext = createContext<ModalProviderValueType>({});
const { Provider } = ModalContext;

type ModalProviderProps = {
  children: React.ReactNode
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [openModal, setOpenModel] = useState<ModalObject | undefined>(undefined)
  const handleToggle = (payload: ModalObject) => setOpenModel(payload)
  const handleClose = () => setOpenModel({ name: '', data: null, state: false })

  return (
    <Provider value={{ openModal, handleToggle, handleClose }}>
      {children}
    </Provider>
  )
}

export { ModalContext, ModalProvider }