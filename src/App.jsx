import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo, editTodo } from './features/counterSlice'

function App() {
  const [text, setText] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text))
      setText('')
    }
  }

  const handleEditSave = (id) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, newText: editText }))
      setEditId(null)
      setEditText('')
    }
  }


  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }} className='flex flex-col items-center'>
      <h2 className='text-2xl'>Todo List</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="loading vazifa..."
          className='p-2 rounded-xl border-2 border-solid border-sky-500/80'
        />
        <button onClick={handleAdd} style={{ marginLeft: 10 }} className='p-2 rounded-xl bg-sky-500/80 border-2 border-solid border-blue-500/70'>
          Qoshish
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: 10 }}>
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className='px-2 py-2.5 rounded-xl bg-[#f9f9f9] '
                />
                <button onClick={() => handleEditSave(todo.id)} className='p-1 rounded-xl bg-sky-500/80 border-2 border-solid border-blue-500/70'>Save</button>
                <button onClick={() => setEditId(null)} className='ml-0.5 py-1 px-3 rounded-xl bg-red-500/80 border-2 border-solid border-blue-500/70'>X</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                  className={`pl-2 py-2.5 pr-[100px] rounded-xl ${todo.completed ? 'bg-green-400' : 'bg-[#f9f9f9]'
                    }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => {
                    setEditId(todo.id)
                    setEditText(todo.text)
                  }}
                  style={{ marginLeft: 10 }}
                  className='p-2 rounded-xl bg-sky-500/80 border-2 border-solid border-blue-500/70'
                >
                  edit
                </button>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  style={{ marginLeft: 5 }}
                  className='py-2 px-4 rounded-xl bg-red-500/80 border-2 border-solid border-blue-500/70'
                >
                  X
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
