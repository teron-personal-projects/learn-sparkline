# Typescript Notes

## What is typescript?

Typescript adds additional syntax to help check for errors. Typescript is about "Type Safety".
It makes sure you are using the right "type" in the right way. 

Typescript job is to handle "Static Checking". It checks your code while you are writing it, 
it gives feedback about possible errors. This means the errors I caught before the code hits the runtime.

Typescript is converted into JavaScript. 

- TS is a superset of JS. 
- It's wrapper around JS. 
- It's a development Tool.

### TypeScript Type Checking: 

TypeScript analyzes code for type-related errors and inconsistencies, ensuring adherence to specified types and catching potential issues before runtime.
### TypeScript Compilation:

TypeScript compiles TypeScript code into JavaScript, transforming TypeScript syntax and features into equivalent JavaScript syntax for compatibility with JavaScript runtime environments.

### Integration: 

TypeScript seamlessly combines type checking and compilation processes, providing both error detection and code transformation in a single step when you run the TypeScript compiler (`tsc`).

### File Extension  

Typescript files end with ".ts" , however, in react apps we use ".tsx". This is to show that we are using
typescript and JSX.
  
## Working with Types:

### Typing basics

Typing in TypeScript ensures that your code is more robust and predictable by defining the expected 
shapes and behaviors of data throughout your program.

If we are creating a variable but are not assigning it right away we need to tell TS what type it is.
For defining type use ':' then the type.

```ts
  // types are written in lowercase
  const name: string;
```

If we creating a variable and assign it right away TS will use what's assigned as the type.
In this case there is no need to define the type.

```ts
  // Type = string
  const name = "John";
```

### Typing Functions

When typing using a function, the TS only cares about the functions parameters and what it returns. 
A function is written by defining the name then using the ':' then ()=>. 
Inside the ()=> we must match the functions parameters and then define each type.
After the '()=>' we define what the function should return.
Lastly we use the equal sign and then the arrow function itself.

```ts
  // (parameter:type,)=> functionReturnType = function
  const func:(a: string, b: number, c:boolean) => boolean = (a, b, c) => {

  }
```

If you have a function that doesn't return anything we use 'void' for the return type.
Void is similar to undefine.

```ts
  const func:(a: string, b: number, c:boolean) => void = (a, b, c) => {

  }
```

### Typing Objects

When typing an object you have to define the objects properties ahead of time, as a 'type' or 'interface'.
'types' and 'interfaces' are similar however, the difference is interfaces are extendable like PHP classes,
TS interfaces extend for code reuse, inheriting structure to define specialized types more easily.

#### Interfaces

```ts
  // the 'I' in front of SearchBoxProps is used to identify that it's an interface.
  interface ISeachBoxProps {
    className: string;
    // adding the '?' means the this type is optional.
    placeholder?: string | null;
  }

  export const SearchBox = ({ className, placeholder, onChangeHandler }: ISearchBoxProps ) => (
    <input
      className={`search-box ${className}`}
      type='search'
      placeholder={placeholder}
      onChange={(e)=> onChangeHandler(e)}
    />
  );
```

#### When extending Interfaces:

```ts
  // This interface is taking on or (extending) what's inside of IChangeHandler.
  interface ISeachBoxProps extends IChangeHandlerProps {
    className: string;
    // adding the '?' means the this type is optional.
    placeholder?: string | null;
  }

  interface IChangeHandlerProps {
    onChangeHandler: (a: string) => void
  }

  export const SearchBox = ({ className, placeholder, onChangeHandler }: ISearchBoxProps ) => (
    <input
      className={`search-box ${className}`}
      type='search'
      placeholder={placeholder}
      onChange={(e)=> onChangeHandler(e)}
    />
  );
```

#### overloading Interfaces:

With interface overloading TS will combine both interfaces into 'ISeachBoxProps' without needing
the extends keyword.

```ts
  // both will combine into one interface.
  interface ISeachBoxProps {
    className: string;
    // adding the '?' means the this type is optional.
    placeholder?: string | null;
  }

  interface ISeachBoxProps {
    onChangeHandler: (a: string) => void
  }

  export const SearchBox = ({ className, placeholder, onChangeHandler }: ISearchBoxProps ) => (
    <input
      className={`search-box ${className}`}
      type='search'
      placeholder={placeholder}
      onChange={(e)=> onChangeHandler(e)}
    />
  );
```

#### Types

- With types we don't have the ability to extend or overload. 
- With types we don't use the 'I'.
- Types allow us the use unions.

```ts
  type SeachBoxProps = {
    className: string;
    // adding the '?' means the this type is optional.
    placeholder?: string | null;
    onChangeHandler: (a: string) => void;
  }


  export const SearchBox = ({ className, placeholder, onChangeHandler }: SearchBoxProps ) => (
    <input
      className={`search-box ${className}`}
      type='search'
      placeholder={placeholder}
      onChange={(e)=> onChangeHandler(e)}
    />
  );
```

#### Unions With Types

```ts

  type CanadianAddress = {
    street: string;
    province: string;
  }

  type USAddress = {
    street: string;
    state: string;
  }

  // this type will use either type for checking.
  type NorthAmericanAddress = CanadianAddress | USAddress;

  // when we create Address it's not looking for either Canadian or US for validation.
  const Address: NorthAmericanAdd = {
    street: 'streetName',
    // add either and both are valid
    province: 'provinceName',
    // or
    state: 'stateName',
  }
```

#### The Golden Rule:

If you are writing in a functional style use 'types' of you are writing in a OOP style use 'interfaces'.

## Understanding the ChangeEventHandler

(I need more info for these notes)

```ts
  import { ChangeEventHandler } from 'react';

  type SeachBoxProps = {
    className: string;
    placeholder?: string | null;
    onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  }


  export const SearchBox = ({ className, placeholder, onChangeHandler }: SearchBoxProps ) => (
    <input
      className={`search-box ${className}`}
      type='search'
      placeholder={placeholder}
      onChange={(e)=> ChangeEventHandler}
    />
  );
```

## Understanding Generics


## TS and JSX

[TS handbook jsx basic-usage](https://www.typescriptlang.org/docs/handbook/jsx.html#basic-usage)

[React docs TS](https://react.dev/learn/typescript#typescript-with-react-components)

## React.RC

According to [Typescript-cheatsheets / React](https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets)

"Why is React.FC not needed? What about React.FunctionComponent/React.VoidFunctionComponent?"

"However, the general consensus today is that React.FunctionComponent (or the shorthand React.FC) is not needed. If you're still using React 17 or TypeScript lower than 5.1, it is even discouraged. This is a nuanced opinion of course, but if you agree and want to remove React.FC from your codebase, you can use this jscodeshift codemod.

Some differences from the "normal function" version:

React.FunctionComponent is explicit about the return type, while the normal function version is implicit (or else needs additional annotation).

It provides typechecking and autocomplete for static properties like displayName, propTypes, and defaultProps.

Note that there are some known issues using defaultProps with React.FunctionComponent. See this issue for details. We maintain a separate defaultProps section you can also look up.
Before the React 18 type updates, React.FunctionComponent provided an implicit definition of children (see below), which was heavily debated and is one of the reasons React.FC was removed from the Create React App TypeScript template."

