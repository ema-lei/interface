/* eslint-disable */
const waitPort = require('wait-port')

const params = {
  port: 3001,
  host: 'localhost',
}

beforeAll(async () => {
  await waitPort(params)
}, 60000)

test('should inject metadata for valid nfts', async () => {
  const nfts = [
    {
      address: '0xed5af388653567af2f388e6224dc7c4b3241c544',
      assetId: '2550',
      collectionName: 'Azuki',
      image: 'https://cdn.center.app/1/0xED5AF388653567Af2F388E6224dC7C4b3241C544/2550/d268b7f60a56306ced68b9762709ceaff4f1ee939f3150e7363fae300a59da12.png'
    },
    {
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      assetId: '3735',
      collectionName: 'Bored Ape Yacht Club',
      image: 'https://cdn.center.app/v2/1/697f69bb495aaa24c66638cae921977354f0b8274fc2e2814e455f355e67f01d/88c2ac6b73288e41051d3fd58ff3cef1f4908403f05f4a7d2a8435d003758529.png'
    },
    {
      address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
      assetId: '3947',
      collectionName: 'CryptoPunk',
      image: 'https://cdn.center.app/1/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB/3947/62319d784e7a816d190aa184ffe58550d6ed8eb2e117b218e2ac02f126538ee6.png'
    }
  ]
  for (const nft of nfts) {
    const url = 'http://127.0.0.1:3000/nfts/asset/' + nft.address + '/' + nft.assetId
    const req = new Request(url)
    const res = await fetch(req)
    const body = await res.text()
    expect(body).toMatchSnapshot()
    expect(body).toMatch(nft.collectionName + ' #' + nft.assetId)
    expect(body).toMatch(nft.image)
    expect(body).toMatch(url)
    expect(body).toMatch('og:title')
    expect(body).toMatch('og:image')
    expect(body).toMatch('og:image:width')
    expect(body).toMatch('og:image:height')
    expect(body).toMatch('og:type')
    expect(body).toMatch('og:url')
    expect(body).toMatch('og:image:alt')
    expect(body).toMatch('twitter:card')
    expect(body).toMatch('twitter:title')
    expect(body).toMatch('twitter:image')
  }
})

test('should not inject metadata for invalid calls', async () => {
  const baseReq = new Request('http://127.0.0.1:3000/nfts/asset/0xed5af388653567af2f388e6224dc7c4b3241c544/100000')
  const baseRes = await fetch(baseReq)
  const baseBody = await baseRes.text()
  expect(baseBody).toMatchSnapshot()
  expect(baseBody).not.toMatch('og:title')
  expect(baseBody).not.toMatch('og:image')
  expect(baseBody).not.toMatch('og:image:width')
  expect(baseBody).not.toMatch('og:image:height')
  expect(baseBody).not.toMatch('og:type')
  expect(baseBody).not.toMatch('og:url')
  expect(baseBody).not.toMatch('og:image:alt')
  expect(baseBody).not.toMatch('twitter:card')
  expect(baseBody).not.toMatch('twitter:title')
  expect(baseBody).not.toMatch('twitter:image')
  const urls = [
    'http://127.0.0.1:3000/nfts/asset/0xed5af388653567af2f388e6224dc7c4b3241c544',
    'http://127.0.0.1:3000/nfts/asset/0xed5af388653567af2f388e6224dc7c4b3241c545',
    'http://127.0.0.1:3000/nfts/asset/0xed5af388653567af2f388e6224dc7c4b3241c544/-1',
    'http://127.0.0.1:3000/nfts/asset/0xed5af388653567af2f388e6224dc7c4b3241c544//',
    'http://127.0.0.1:3000/nfts/asset/0xed5af388653567af2f388e6224dc7c4b3241c544//2550'
  ]
  for (const url of urls) {
    const req = new Request(url)
    const res = await fetch(req)
    const body = await res.text()
    expect(body).toEqual(baseBody)
  }
})