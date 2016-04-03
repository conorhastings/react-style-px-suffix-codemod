describe('dont transform specifically ignored prop', () => {
  it('should transform correctly', () => {
    test('test-ignore', {ignore: 'fontSize'});
  });
});