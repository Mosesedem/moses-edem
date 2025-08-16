export default function FloatingElements() {
  return (
    <>
      <div className="absolute top-1/5 left-1/10 floating-1 pointer-events-none">
        <div className="text-4xl text-green-400/30">{"{}"}</div>
      </div>
      <div className="absolute top-3/5 right-1/10 floating-2 pointer-events-none">
        <div className="text-4xl text-green-400/30">{"</>"}</div>
      </div>
    </>
  )
}
