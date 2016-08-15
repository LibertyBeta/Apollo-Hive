import { ApolloHivePage } from './app.po';

describe('apollo-hive App', function() {
  let page: ApolloHivePage;

  beforeEach(() => {
    page = new ApolloHivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
