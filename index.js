const provider = new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/543af9f56f7042c682b7077a287a2781"
  );

const web3 = new Web3(provider)

const round = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
}

const fetchEthPrice = async () => {
    const path = 'https://rest.coinapi.io/v1/exchangerate/ETH/USD';
    const res = await fetch(path, { method: "GET", headers: { "X-CoinAPI-Key": "F2BD4749-3396-4875-8A4E-365494D609AB" } });
    const priceData = await res.json()
    return priceData['rate']
}

const fetchAmount = async (ethPrice) => {
    let balanceLizzie = await web3.eth.getBalance('0x9EB58371498D2179Bc08fF971F3Ef38B53Bbf863')
    let balanceHenry = await web3.eth.getBalance('0x8243DEda5ea5Ae36FA71B91A0d2d6FA0c74CD032')
    let balanceAnnie = await web3.eth.getBalance('0xeC883BAfAef5F4A1233Bf2F0149dcC8652a3a581')


    balanceLizzie = parseFloat(web3.utils.fromWei(balanceLizzie, 'ether'))
    balanceHenry = parseFloat(web3.utils.fromWei(balanceHenry, 'ether'))
    balanceAnnie = parseFloat(web3.utils.fromWei(balanceAnnie, 'ether'))


    const dollarValueLizzie = round(balanceLizzie * ethPrice, 2)
    const dollarValueHenry = round(balanceHenry * ethPrice, 2)
    const dollarValueAnnie = round(balanceAnnie * ethPrice, 2)


    document.getElementById('lizzie').innerHTML = `$${dollarValueLizzie} (${round(balanceLizzie, 4)} eth)`
    document.getElementById('henry').innerHTML = `$${dollarValueHenry} (${round(balanceHenry, 4)} eth)`
    document.getElementById('annie').innerHTML = `$${dollarValueAnnie} (${round(balanceAnnie, 4)} eth)`
}

fetchEthPrice().then(price => fetchAmount(price))