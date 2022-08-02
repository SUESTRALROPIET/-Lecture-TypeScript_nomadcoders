## Call signatures
> 함수 위에 마우스를 올렸을때 보이는 함수 정보
1. 직접 작성
    ```js
        function add(a:number, b:number) {
            return a + b
        }

        const add = (a:number, b:number) => a + b
    ```
2. call signatures 작성
    ```js
        type Add = (a:number, b:number) => number

        const add: Add = (a, b) => a + b
    ```

## Overloading
- 함수가 서로 다른 여러 개의 call signatures를 가지고 있을 때 발생
    ```js
    type Add = {
        (a: number, b: number) : number
        (a: number, b: string) : number
    }

    const add: Add = (a, b) => {
        if (typeof b === "string") return a
        
        return a + b
    }
    ```
    - 가장 자주 사용되는 예시
        ```js
        Router.push({
            path: "/home",
            state: 1
        })

        .push("/home")
        ```
        ```js
        type Config = {
            path: string,
            state: object,
        }

        type Push = {
            (path: string): void
            (config: Config): void
        }

        const push: Push = (config) => {
            if(typeof config == "string") console.log(config)
            else {
                console.log(config.path, config.state)
            }
        }
        ```
    - 선택적 인자가 있는 경우
        ```js
        type Add = {
            (a: number, b: number): number,
            (a: number, b: number, c: number): number,
        }

        const add: Add = (a, b, c?:number) => {
            if (c) return a + b + c
            return a + b
        }
        add(1, 2)
        add(1, 2, 3)
        ```

## Polymorphism(다형성)
- 직접 입력 타입을 모두 지정해주면 코드가 반복된다.
    ```js
    type SuperPrint = {
        (arr: number[]): void,
        (arr: boolean[]): void,
        (arr: string[]): void,
        (arr: (number|boolean)[]): void
    }

    const superPrint: SuperPrint = (arr) => {
        arr.forEach(i => console.log(i))
    }

    superPrint([1, 2, 3, 4])
    superPrint([true, false, true, true])
    superPrint(['a', 'b', 'c', 'd'])
    superPrint([1, 2, true, false, 'abc']) // => 오류
    ```
    > 마지막 코드는 원소에 들어가는 타입을 모두 작성해주어야하는 비효율적인 상황이 발생

- generic 타입으로 작성하기
    - 예시 1
        ```js
        //TypePlaceholder 은 아무 문자로 작성해도 된다. 
        // 주로 'T'를 사용
        type SuperPrint = {
            <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder
        }

        const superPrint: SuperPrint = (arr) => arr[0]

        const a = superPrint([1, 2, 3, 4])
        const b = superPrint([true, false, true, true])
        const c = superPrint(['a', 'b', 'c', 'd'])
        const d = superPrint([1, 2, true, false, 'abc'])
        ```

    - 예시 2
        ```js
        // generic 타입
        type SuperPrint = <T, M>(a: T[], b:M) => T

        const superPrint: SuperPrint = (arr) => arr[0]

        const a = superPrint([1, 2, 3, 4], "x")
        const b = superPrint([true, false, true, true], 1)
        const c = superPrint(['a', 'b', 'c', 'd'], false)
        const d = superPrint([1, 2, true, false, 'abc'], [])

        c.toUpperCase()
        d.toUpperCase()     // => 에러
        ```

    - 예시 3: 함수형으로 작성
        ```js
        function superPrint<T>(a: T[]) {
            return a[0]
        }

        const a = superPrint<number>([1, 2, 3, 4]) // => type을 overwrite
        ```
    
    - 예시 4: 선택적으로 변수 생성
        ```js
        type Player<E> = {
            name: string,
            extraInfo: E
        }

        type NicoPlayer = Player<{favFood: string}>

        const a: NicoPlayer = {
            name: "nico",
            extraInfo: {
                favFood: "kimchi"
            }
        }

        const lynn: Player<null> = {
            name: "lynn",
            extraInfo: null
        }
        ```

    - 예시 5: useState로 받는 값
        ```js
        useState<number>()
        ```
