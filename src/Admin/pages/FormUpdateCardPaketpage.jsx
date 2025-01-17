import React from 'react'
import FormUpdateCardPaket from '../components/FormUpdateCardPaket'

// Data untuk DeskripsiDestinasiComponents
const deskripsiData = {
  title: "BALI PURE TOUR",
  location : "Place Penempahan Manukaya",
  DeskripsiCard: "The tour visits a sacred temple with religious nuances in a beautiful and ancient village, namely Manukaya village",
  price: "58.67 USD",
  Note: "Note: Prices can change according to the number of tourist quotas",
  Maximal_Jointour:"5 Person",
  Jumlah_Guide:"2 Person",
  updatelink: "#",
};

const FormUpdateCardPaketpage = () => {
  return (
    <div>
      <FormUpdateCardPaket {...deskripsiData}/>
    </div>
  )
}

export default FormUpdateCardPaketpage
