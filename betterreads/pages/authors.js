import Head from 'next/head'
import {
  Container,
  Main,
  BookShelf
} from '../components/sharedstyles'
import useSWR from 'swr'
import AuthorList from '../components/AuthorList'


// function to fetch particular url and return the data as json
const fetcher = url => fetch(url).then(r => r.json())

export default function Home() {
  // vaariables that store our data and if there's ane error
  // first param is path of the api endpoint (what will be fetched)
  // second para is the fetcher function that should execute to get the data
  // data will be json if correct
  // error will be error object, data is undefined 
  const { data,error } = useSWR('api/books', fetcher)

  // 3 states of front end styles
  // if the api encountersan error,the api will load this
  if (error){
    return <Main>
      Error!
    </Main>
  }

  //or like weather app, you can have a fallback to 
  // fetch data and lload a deafult 
  // loadingstate --> if the data has not been resolved yet, this loads
  //  can also return a loading spinner  
  if (!data){ 
    return <Main>
      Loading...
    </Main>
  }

  // if the data comes back as expected,  this renders
  return (
    <Container>
      <Head>
        <title>BetterRead</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <h1>BetterReads - Authors</h1>
        <BookShelf>
        <AuthorList authors = {data}></AuthorList>
        </BookShelf>
        
      </Main>
    </Container>
  )
}