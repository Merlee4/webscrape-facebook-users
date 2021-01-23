const moment = require('moment')
const axios = require('axios')
const { parse } = require('node-html-parser')
const cheerio = require('cheerio')
const os = require('os')

const prompt = require('prompt')
const { on } = require('process')


const timeOfDya = moment().format('HH')
const username = os.homedir().split('\\')


// console.log(`${moment().format('HH') < 11 ? "Good Morning"} ${username[2]} \n`)
console.log(moment().format < 11 ? `Good Morning ${username[2]}` : `Good Afternoon / Night ${username[2]}`)
console.log('What would you like to do')

prompt.start()
prompt.get(['answer'], (err, result) => {

     console.log('Loading...\n')

     if (result.answer == '1') {
          const the = (async () => {
               console.log('----------------\n')
               const app = await axios.get('https://www.worldometers.info/coronavirus/country/zambia/')
               const data = app.data
               const $ = cheerio.load(data)
               const siteHeading = $('.maincounter-number')

               const info = siteHeading.find('span').text()

               const thee = info.split(' ')
               let cases = thee[0]
               let death = thee[1]
               let theOthers = death.split(',')
               let deaths = theOthers[0]
               let rec = theOthers[1]

               console.log('ZAMBIA\n')
               console.log(`Cases : ${cases}`)
               console.log(`Deaths : ${rec}`)
               console.log(`Recoveries : ${deaths}`)
               console.log('\n----------------')
               return (
                    {
                         cases: cases,
                         deaths: deaths,
                         rec: rec
                    }
               )
          })()
     }
     if (result.answer == '2') {
          prompt.start()
          prompt.get(['username'], (err, result) => {
               console.log('\nLoading...')

               const app = (async () => {

                    try {
                         const imgUrl = await axios.get(`https://free.facebook.com/${result.username}`)
                         const imgData = imgUrl.data
                         const imgify = cheerio.load(imgData)
                         const image = imgify('.cm').find('img')
                         const img = image.attr('src')


                         const townUrl = await axios.get(`https://free.facebook.com/${result.username}`)
                         const townData = townUrl.data
                         const townify = cheerio.load(townData)
                         // const town = townify('.cw').find('a')
                         const userTn = townify('.ce.ct.be')
                         // let onlyTown = userTn[3]
                         // let onlyCount = userTn[4]
                         // let placeLiving = `${onlyTown}${onlyCount}`

                         const userName = await axios.get(`https://web.facebook.com/${result.username}`)
                         const data = userName.data
                         const $ = cheerio.load(data)
                         const UsersFriendsCount = $('._2nlv')
                         const userFr = UsersFriendsCount.text().split(' ')

                         console.log('----------------------------------------------------------------------------------------')
                         console.log(`\nName: ${userFr[0]} ${userFr[2]} \nCurrent City: ${userTn} is Home \nProfile Picture : \n ${img}`)
                         return (
                              {
                                   name: `${userFr[0]} ${userFr[2]}`,
                                   city: userTn,
                                   profile: img
                              }
                         )

                    } catch (error) {
                         console.log(`There was a problem with your search : ${result.username}`)
                    }
                    //on.lak.39
               })()
          })
     }

     if (result.answer == '3') {



          prompt.start()
          prompt.get(['twiiterUsername'], (err, result) => {
               console.log('Loading...')


               const the = (async () => {

                    // try {
                    const app = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.twitter.com/traversymedia`)
                    const data = app.data
                    const $ = cheerio.load(data)
                    const title = $('.css-901oao').text()
                    const toDis = title
                    console.log(toDis)
                    // } catch (error) {
                    //      console.log(`There was a problem with your search : ${result.username} \n${error}`)
                    // }
                    // traversymedia
               })()


          })
     }

     // if (result.answer == '4') {
     //      prompt.start()
     //      prompt.get(['username'], (err, result) => {
     //           console.log('Loading...')

     //           const the = (async () => {

     //                try {
     //                     const app = await axios.get(`https://web.facebook.com/${result.username}`)
     //                     const data = app.data
     //                     const $ = cheerio.load(data)
     //                     const UsersFriendsCount = $('._2nlv')

     //                     const userFr = UsersFriendsCount.text().split(' ')
     //                     console.log(`\n ${userFr[0]} ${userFr[2]} `)
     //                } catch (error) {
     //                     console.log(`Could not find any user with username: ${result.username}`)
     //                }

     //           })()
     //      })
     // }



})

console.log("\n------------------------------------------------------------------")
console.log("[1] local Covid 19 Cases  [2] Search Facebook name by username\n")
console.log("[3] Search Twiiter        [4] Search Facebook name by username")
console.log("------------------------------------------------------------------")
