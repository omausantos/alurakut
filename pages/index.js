import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet  } from '../src/lib/AlurakutCommons'
import nookies from 'nookies'

function ProfileSidebar(propriedades) {
  return (
    <Box as="sibedar" style={{ display: "block" }}>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" style={{ color: "#000"}} href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBoxWrapperProperties(props) { 
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.itens.length})
      </h2>
      <ul>
        {props.itens.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>              
              <a href={itemAtual.html_url ? itemAtual.html_url : itemAtual.url} target="_blank">
                <img src={itemAtual.login ? `https://github.com/${itemAtual.login}.png` : itemAtual.image} />
                <span>{itemAtual.login ? itemAtual.login : itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}


export default function Home() { 
  
  const [githubUser, setGithubUser] = React.useState('omausantos')


  // Variaveis de Confiável | Legal | Sexy
  const [confiavel, setConfiavel] = React.useState([])
  const [legal, setLegal] = React.useState([])
  const [sexy, setSexy] = React.useState([])

  const [grupos, setGrupos] = React.useState([])

  React.useEffect(() => {
    setConfiavel(nookies.get().confiavel)
    setLegal(nookies.get().legal)
    setSexy(nookies.get().sexy)

    fetch(`/api/groups?user=${githubUser}`)
      .then((response) => response.json())
      .then((response) => {
        const result = response.sort(() => Math.random() - Math.random()).slice(0, 6)
        setGrupos(result)
      })
      
  }, [])

  const [images, setImages] = React.useState([])
  const [image, setImage] = React.useState([])
  React.useEffect(() => {
    fetch('/api/images')
      .then((response) => response.json())
      .then((response) => {
        const result = response.sort(() => Math.random() - Math.random()).slice(0, 6)
        setImages(result)
      })
  }, [])

  // Função para requisitar lista de Comentários
  const [listaComentarios, setListaComentarios] = React.useState([])
  React.useEffect(() => {
    fetch(`/api/comments?user=${githubUser}`)
      .then((response) => response.json())
      .then((response) => {
        const includesetListaComentarios = 
          response
          .slice(0, 6)
        setListaComentarios(includesetListaComentarios)
      })
  }, [])
  
  // Função para requisitar quem usuário segui no GitHub
  const [pessoasFavoritas, setPesssoasFavoritas] = React.useState([])
  // Função para requisitar seguidores do GitHub
  const [followersNumber, setFollowersNumber] = React.useState([])
  const [followers, setFollowers] = React.useState([])
  const [subscriptions, setSubscriptions] = React.useState([])
  const [events, setEvents] = React.useState([])
  React.useEffect(() => {
      fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((response) => response.json())
      .then((response) => {
        const includeListpessoasFavoritas = response.sort(() => Math.random() - Math.random()).slice(0, 6)
        setPesssoasFavoritas(includeListpessoasFavoritas)
      })
      fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((response) => response.json())
      .then((response) => {
        setFollowersNumber(response.length)
        const result = response.sort(() => Math.random() - Math.random()).slice(0, 6)
        setFollowers(result)        
      })
      fetch(`https://api.github.com/users/${githubUser}/subscriptions`)
      .then((response) => response.json())
      .then((response) => {
        setSubscriptions(response.length)       
      })
      fetch(`https://api.github.com/users/${githubUser}/events`)
      .then((response) => response.json())
      .then((response) => {
        setEvents(response.length)       
      })
  }, [])

  

  
  

  // Show/hide Formularios de Recado e Grupos
  const [recado, setRecado] = React.useState(true)
  const [grupo, setGrupo] = React.useState(false)


  return (
    <>
      
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          
          <Box>
            <h1 className="title">
              Olá Visitante!
            </h1>

            <OrkutNostalgicIconSet 
              confiavel={confiavel} 
              setconfiavel={setConfiavel}
              legal={legal} 
              setlegal={setLegal}
              sexy={sexy} 
              setsexy={setSexy}
              fas={followersNumber}
              recados={listaComentarios.length}
              projetos={subscriptions}
              commits={events}
            />
          </Box>
          <ProfileRelationsBoxWrapper>
            <h3 className="smallTitle">
              O que deseja realizar?
            </h3>        
            
            <button className={recado ? 'link action' : 'link'} onClick={() => {
              setRecado(!recado)
              setGrupo(!grupo)
            }}>              
              Deixar um recado
            </button>
            <button className={grupo ? 'link action' : 'link'} onClick={() => {
              setGrupo(!grupo)
              setRecado(!recado)
            }}>
              Indicar um grupo
            </button>

            <form 
              style={{ display: recado ? '' : 'none'}}

              onSubmit={(e) => {
                e.preventDefault();
                const dadosForm = new FormData(e.target);
                const comentario = {
                  name: dadosForm.get('name'),
                  comment: dadosForm.get('comment'),
                  city: dadosForm.get('city'),
                  author: dadosForm.get('author'),
                }

              fetch('/api/comments', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comentario)
              })

              const listaComentariosAtualizadas = [comentario, ...listaComentarios]
              setListaComentarios(listaComentariosAtualizadas)

            }}>
              <div className="rowInputs">
                <input 
                  type="text" 
                  placeholder="Qual seu nome?" 
                  name="name" 
                  arial-label="Qual seu nome?"
                  required
                />
                <input 
                  type="text" 
                  placeholder="Está em qual cidade?" 
                  name="city" 
                  arial-label="Está em qual cidade?"
                />
              </div>
              <div>
                <label>
                  <span>
                    O que tem a dizer?
                  </span><br/>
                    (compativel com scrabs, copie aqui <a href="http://www.scrapsweb.com.br/" target="_blank">www.scrapsweb.com.br</a>)
                </label>
                
                <textarea
                  name="comment" 
                  required
                >                  
                </textarea>
                <input 
                  type="hidden"
                  name="author"
                  onChange={(e) => {
                    setGithubUser(e.target.value)
                  }}
                  value={githubUser}
                />
                
              </div>
              <button className="add">
                Criar recado
              </button>              
            </form>            
                
            <form
              style={{ display: grupo ? '' : 'none'}}

              onSubmit={(e) => {
                e.preventDefault();
                const dadosForm = new FormData(e.target);

                const grupo = {
                  title: dadosForm.get('title'),
                  url: dadosForm.get('url'),
                  image: dadosForm.get('image'),
                  author: dadosForm.get('author'),
                }

                fetch('/api/groups', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(grupo)
                })

                const gruposAtualizadas = [
                  {'id': new Date().toISOString(),...grupo}
                  , ...grupos
                ]
                setGrupos(gruposAtualizadas);
              }}>


              <div className="rowInputs">
                <input 
                  type="text" 
                  placeholder="Qual vai ser o nome do grupo?" 
                  name="title" 
                  arial-label="Qual vai ser o nome do grupo?"
                  required
                />
                <input 
                  type="text" 
                  placeholder="Link do grupo" 
                  name="url" 
                  arial-label="Link da grupo"
                  required
                />
              </div>
              <div>
                <input 
                  type="text"
                  placeholder="Escolha uma imagem ou digite a URL"
                  name="image"
                  arial-label="Escolha uma imagem ou digite a URL"
                  required
                  onChange={(e) => {
                    setImage(e.target.value)
                  }}
                  value={image}
                />
                <input 
                  type="hidden"
                  name="author"
                  onChange={(e) => {
                    setGithubUser(e.target.value)
                  }}
                  value={githubUser}
                />
              </div>

              <ul>
                {images.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>              
                      <a target="_blank" onClick={() => {
                        setImage(itemAtual.url)
                      }}>
                        <img src={itemAtual.url} />
                      </a>
                    </li>
                  )
                })}
              </ul>

              <button className="add" style={{ marginTop: "10px"}}>
                Criar grupo
              </button>
              
            </form>
            
            
          </ProfileRelationsBoxWrapper>

          <Box>
            <h3 className="smallTitle">
              Recados ({listaComentarios.length})
            </h3>

            <ul className="list-commits">
              {listaComentarios.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <h4>
                      {itemAtual.name} - {itemAtual.city}
                    </h4>
                    <p dangerouslySetInnerHTML={{__html: itemAtual.comment}}>
                    </p>
                  </li>
                )
              })}              
            </ul>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapperProperties title='Grupos' itens={grupos} />
          <ProfileRelationsBoxWrapperProperties title='Devs do Poder' itens={pessoasFavoritas} />
          <ProfileRelationsBoxWrapperProperties title='Seguidores' itens={followers} />
        </div>
      </MainGrid>      
    </>
  )  
}
