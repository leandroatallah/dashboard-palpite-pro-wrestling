import { useState } from 'react'

const ITEMS_PER_PAGE = 10

const Table = ({ columns, data, isLoading }) => {
  const [page, setPage] = useState(1)
  const displayedItems = data?.length ? data.slice(page * ITEMS_PER_PAGE - ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) : []
  const paginationItems = Array(Math.ceil(data.length / ITEMS_PER_PAGE)).fill(0)

  return (
    <div className="flex flex-col border border-zinc-700 rounded-lg">
      <div className="thead">
        <div className="tr flex flex-nowrap border-b border-zinc-700">
          {columns.map(({ title, key, small }) => (
            <div className={`th ${small ? 'w-1/2' : 'w-full'} p-4 py-3 font-semibold`} key={key}>
              {title}
            </div>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center">Carregando...</div>
      ) : null}

      {!isLoading && !data?.length ? (
        <div className="p-8 text-center">Sem dados</div>
      ) : null}

      {data?.length ? (
        <div className="tbody">
          {displayedItems.map((row) => (
            <div className="tr flex flex-nowrap border-b border-zinc-700 last:border-b-0" key={row.id}>
              {columns.map(({ key, small, render, align }) => (
                <div className={`td inline-flex items-center ${small ? 'w-1/2' : 'w-full'} text-${align ? align : 'left'} p-4 py-3 text-sm`} key={key}>
                  {render ? render(row[key], row) : row[key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {data?.length ? (
        <div className="tfoot border-t border-zinc-700 flex justify-between items-center py-2 px-4">
          <div className="text-xs">
            Exibindo {displayedItems.length} de {data.length} itens.
          </div>
          <div>
            <ul className="list-none flex gap-1.5">
              {paginationItems.map((_, key) => {
                const count = key + 1

                if (count === page) {
                  return (<li className="inline-block" key={count}>
                    <span className="inline-block px-1 border border-zinc-700 bg-zinc-700 min-w-[22px] text-center rounded-sm text-sm">{count}</span>
                  </li>)
                } else {
                  return (
                    <li className="inline-block" key={count}>
                      <button
                        className="inline-block px-1 border border-zinc-700 min-w-[22px] text-center rounded-sm  text-sm"
                        onClick={() => setPage(count)}>
                        {count}
                      </button>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Table
