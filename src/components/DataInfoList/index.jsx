const DataInfoItem = ({ title, value, color }) => {
  return (
    <div className={`min-column-height flex flex-col rounded-2xl p-6 w-full justify-between ${color}`}>
      <h4 className="font-bold mb-10">{title}</h4>
      <div className="text-6xl font-bold">{value}</div>
    </div>
  )
}

const DataInfoList = () => {
  return (
    <div className="flex flex-nowrap gap-4">
      <DataInfoItem title="Ranking geral" value="12º" color="bg-amber-600" />
      <DataInfoItem title="Pontos" value="128" color="bg-fuchsia-400" />
      <DataInfoItem title="Palpites enviados" value="6" color="bg-green-600" />
    </div>
  )
}

export default DataInfoList
