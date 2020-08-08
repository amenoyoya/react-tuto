import {Helmet} from 'react-helmet-async';

export default () => {
  // 送信イベント: omdbapi で映画を検索
  const onsubmit = (e) => {
    e.preventDefault() // デフォルトの submit イベントは起こさない

    const searchValue = document.getElementById('search').value
    // ?apikey={your own api key}
    // following apikey is provided by https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse)
      })
  }
  return (
    <div>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Helmet>
      <form onSubmit={onsubmit}>
        <input id="search" type="text" />
        <button type="submit">search</button>
      </form>
    </div>
  )
}