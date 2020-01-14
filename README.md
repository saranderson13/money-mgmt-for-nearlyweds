# Money Management for Nearlyweds

MMfN is a web application to help newly engaged couples with the potentially daunting task of figuring out how they can save up for their wedding.

## Installation

For the moment, to install the application, download the repo and run 'bundle install'. Then migrate the db the database, and start your rails server. For an example account, you can seed the database, and login with the credentials below. (If you are seeding, do that before starting the server.) However, once you've started the server, even if you don't seed you're all set to make your own account(s).

```bash
bundle install

rails db:migrate

rails db:seed

rails s
```

STARTER LOGIN CREDENTIALS
```
Account 1:
    Email: benny@example.com
    Password: password

Account 2:
    Email: allison@example.com
    Password: password
```

## Usage

MMfN uses joint accounts so that both parties are able to access their wedding. If you are the first to make an account, select "My partner has not signed up yet." on the Sign Up page and you will be prompted to enter some information about your wedding.

If your partner has already signed up, you will select the other radio button, "My partner has already signed up.", and be prompted to enter their email address.

Once you have signed up, regardless of whether both parties have joined, you are able to edit your anticipated expenses, (on the Wedding Page), and enter your personal financial information, (on the Savings Page). You may also use the savings page to add to your current savings - this will track how much you've saved vs. how much you will still need to save.

Once some numbers are entered the application will begin to build a picture of how much needs to be saved, and what you can save to meet that goal. On the savings page, an amount is reccommended for you, but you will also enter the amount that you would actually like to save, but editing the summary table. The recommended amount is NOT the amount that will guarantee that you can save enough for your wedding. It is half of your remaining income after encumbrances. You may need to enter more (or less) than that to meet your goal.

Once your partner has also entered their financial information, the Wedding Page will reflect both sets of finances and give you a full summary of whether, together, you will be able to meet your goal.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)