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

## Interfaces

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

### When extending:

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