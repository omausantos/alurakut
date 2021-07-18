import nookies from 'nookies';

export default function Logout() {}

export async function getServerSideProps(context) {
  nookies.destroy(context, 'USER_TOKEN')
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    }
  }
}