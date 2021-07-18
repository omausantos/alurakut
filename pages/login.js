import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

function mensageErros(){
  return (
    <div class="alert alert-danger" role="alert">
      Usuário invalido ou inexistente, digite um <strong>login Github</strong> no formulário!
    </div>
  )
}

export default function LoginScreen(props) {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('omausantos');
  React.useEffect(() => {
    document.title = "GitKut - O Lugar da Nostalgia"
 }, []);

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          {props.m ? mensageErros() : ''}
          <h1 className="title" style={{ fontSize:"50px", paddingBottom:"20px" }}>GitKut</h1>

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault();
                fetch('https://alurakut.vercel.app/api/login', {
                    method: 'POST',
                    headers: {
                       'Content-Type': 'application/json'  
                    },
                    body: JSON.stringify({ githubUser: githubUser })
                })
                .then(async (respostaDoServer) => {
                    const dadosDaResposta = await respostaDoServer.json()
                    const token = dadosDaResposta.token;
                    nookies.set(null, 'USER_TOKEN', token, {
                        path: '/',
                        maxAge: 86400 * 7 
                    })
                    router.push(`/user/${githubUser}`)
                })
          }}>
            <p>
              Acesse o <strong>GitKut</strong> com sua conta
          </p>
            <input
                placeholder="Usuário"
                value={githubUser}
                onChange={(evento) => {
                    setGithubUser(evento.target.value)
                }}
            />
            {githubUser.length === 0
                ? 'Preencha o campo'
                : ''
            }
            <button type="submit">
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {

  const m = context.query.m ? context.query.m : false
  return {
    props: {
      m
    },
  }
}