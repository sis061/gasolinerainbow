

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen flex border-1 justify-center p-5'>
        <div className="w-1/2 h-auto flex flex-col justify-center items-center bg-amber-50 border-1 gap-5">
          <h1 className='text-4xl'>
            hello world?
          </h1>
          <ul className="py-5 px-10 border-1 rounded-2xl [&_>li]:text-2xl">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
