export { };

declare global {
  interface String {
    toCapitalize(): string;
  }
}

// eslint-disable-next-line no-extend-native, func-names
String.prototype.toCapitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
