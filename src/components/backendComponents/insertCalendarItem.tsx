
// criar função handle submit para enviar para o banco de dados

const InsertCalendarItem = () => {
  return (
    <form>
      <input name="date" type="date" /> {/* validate date (bigger thant today)*/}
      <label>Nome</label>
      <input name="name" type="text" />
      <label>Descrição</label>
      <input name="description" type="text" />
      <label>Nome do lugar</label>
      <input name="venue" type="text" />
      <label>Localização</label>
      <input name="location" type="text" />

      <button type="submit">Enviar</button>
    </form>
  )
}


export default InsertCalendarItem
