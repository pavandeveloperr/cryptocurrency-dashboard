import axios from "axios"
import actionTypes from "./types"

export const fetchCoins = () => {
      return (dispatch) => {
          axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&per_page=9')
          .then(response =>{
              const data = response.data
              dispatch({
                type: actionTypes.COIN_API_SUCCESS,
                payload: data
              })
          })
          .catch(error =>{
              const errorMsg = error.message
              dispatch({
                type: actionTypes.COIN_API_ERROR,
                payload : errorMsg
              })
          })
      }
  }