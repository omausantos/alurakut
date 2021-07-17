import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet  } from '../src/lib/AlurakutCommons'

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
  
  const githubUser = 'omausantos';
  const [comunidades, setComunidades] = React.useState([{
    id: '123456789',
    title: 'Nois capota mas não breca',
    image: 'https://picsum.photos/300/300',
    url: 'https://www.youtube.com/watch?v=a1_671v46DI'
  }])

  // Função para requisitar seguidores do GitHub
  const [pessoasFavoritas, setPesssoasFavoritas] = React.useState([])
  React.useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((response) => response.json())
      .then((response) => {
        const includeListpessoasFavoritas = response.sort(() => Math.random() - Math.random()).slice(0, 6)
        setPesssoasFavoritas(includeListpessoasFavoritas)
      })
  }, [])

  // Função para requisitar lista de Comentários
  const [listaComentarios, setListaComentarios] = React.useState([])
  React.useEffect(() => {
    fetch('/api/comments')
      .then((response) => response.json())
      .then((response) => {
        const includesetListaComentarios = 
          response
          .slice(0, 6)
        setListaComentarios(includesetListaComentarios)
      })
  }, [])

  // Variaveis de Confiável | Legal | Sexy
  const [confiavel, setConfiavel] = React.useState([])
  const [legal, setLegal] = React.useState([])
  const [sexy, setSexy] = React.useState([])


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
              Bem vindo, Fulano!
            </h1>

            <OrkutNostalgicIconSet 
              confiavel={confiavel} 
              setconfiavel={setConfiavel}
              legal={legal} 
              setlegal={setLegal}
              sexy={sexy} 
              setsexy={setSexy}
            />
          </Box>
          <Box>
            <h3 className="smallTitle">
              O que deseja realizar?
            </h3>        
            <button disabled={true}>
              Criar comunidade
            </button>
            <button onClick={() => {
              setConfiavel(3)
            }}>
              Criar comment
            </button>    
            <form style={{ display: "none"}} onSubmit={(e) => {
              e.preventDefault();
              const dadosForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                image:  dadosForm.get('image')
              }

              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas);
            }}>


              <div>
                <input 
                  type="text" 
                  placeholder="Qual vai ser o nome da sua comunidade" 
                  name="title" 
                  arial-label="Qual vai ser o nome da sua comunidade"
                  required
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Coloque uma URL para usarmos na capa" 
                  name="image" 
                  arial-label="Coloque uma URL para usarmos na capa"
                  required
                />
              </div>

              <button>
                Adicionar +
              </button>
              
            </form>

            <form onSubmit={(e) => {
              e.preventDefault();
              const dadosForm = new FormData(e.target);
              const comentario = {
                name: dadosForm.get('name'),
                comment: dadosForm.get('comment'),
                city: dadosForm.get('city')
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


              <div>
                <input 
                  type="text" 
                  placeholder="Qual seu nome?" 
                  name="name" 
                  arial-label="Qual seu nome?"
                  required
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="O que tem a dizer?" 
                  name="comment" 
                  arial-label="O que tem a dizer?"
                  required
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Está em qual cidade?" 
                  name="city" 
                  arial-label="Está em qual cidade?"
                />
              </div>

              <button>
                Adicionar +
              </button>
              
            </form>
          </Box>

          <Box>
            <h3 className="smallTitle">
              Ideias de comentários ({listaComentarios.length})
            </h3>

            <ul className="list-commits">
              {listaComentarios.map((itemAtual) => {
                return (
                  <li  key={itemAtual.id}>
                    <h4>
                      {itemAtual.name} - {itemAtual.city}
                    </h4>
                    <p>
                      {itemAtual.comment}
                    </p>
                  </li>
                )
              })}              
            </ul>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapperProperties title='Comunidades' itens={comunidades} />
          <ProfileRelationsBoxWrapperProperties title='Devs do Poder' itens={pessoasFavoritas} />
        </div>
      </MainGrid>      
    </>
  )  
}
