# Live Market Data
You are given the task of writing a simple and state-of-the-art web application which exposes the real time market data in USD for the two cryptocurrencies BTC and ETH for potential investors.
You may also write a small frontend consuming these endpoints to showcase the capabilities.

Investors additionally want to see how the market price has developed historically over the last 24 hours.

## Guidelines
- This challenge should not take more than 3 to 4 hours, however there is no time limit as such.
- You are provided a 3rd party API that provides the market data.
- Make sure the code you deliver is what you would be comfortable deploying and maintaining **in production**!
  - Read this sentence again. Most people that don't pass the exercise have issues with quality even though their code does the right thing.
- We will be looking at code quality, readability, maintainability, extensibility (for example: what if an additional currency needs to be added in the future?) adherence to best practices, chosen tooling, design and user experience
- Please include a short README when returning your solution describing **decisions and assumptions** you made during development.
- Please submit as a ZIP file over either email or DropBox/Google Drive/etc - do NOT push to a public repository.

## Market Data Provider
You are encouraged to get the real market data from the CryptoCompare 3rd party API.
Please find their API documentation [here](https://min-api.cryptocompare.com/documentation).

Here's an example to get the historical market price for a specified currency:
> https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USDC

Please use the following API key from CryptoCompare in case it is required:
> 803c94d04602d67745b502400692d6d662240a7f37e5c7e9d72b64f74d3dd133