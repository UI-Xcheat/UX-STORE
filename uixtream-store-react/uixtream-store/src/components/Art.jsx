import emblem from '../assets/emblema-negro.png'

// Banner del producto o, si no tiene, el emblema sobre un fondo gráfico.
export default function Art({ product, index = 0, children }) {
  const plain = !product.banner
  return (
    <div className={`art${plain ? ` emb${index % 2 ? ' b' : ''}` : ''}`}>
      {plain ? (
        <img src={emblem} alt="" />
      ) : (
        <img className="bn" src={product.banner} alt={product.name} />
      )}
      <span className="tag">{product.badge}</span>
      {children}
    </div>
  )
}
