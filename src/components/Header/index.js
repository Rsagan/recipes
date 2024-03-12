import './header.css';
import { Link } from 'react-router-dom'

function Header(){
  return(
    <header>
      <Link className="logo" to="/">Só Receitas .COM</Link>
      <Link className="favoritos" to="/favoritos">Minhas Receitas</Link>
    </header>
  )
}

export default Header;