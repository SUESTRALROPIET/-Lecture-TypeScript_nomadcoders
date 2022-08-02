## 1. Class
1. public, protected, private 클래스

    | 클래스 구분 | 선언한 클래스 내 | 상속받은 클래스 내 | 인스턴스|
    |--|--|--|--|
    |private|O|X|X|
    |protected|O|O|X|
    |public|O|O|O|

    - private, public 클래스 비교
        ```js
        // private, public는 JS에서 안 보임, 반영된 것인지 알 수 없음
        class Player {
            constructor(
                private firstName: string,
                private lastName: string,
                public nickname: string,
            ) {}
        }

        const nico = new Player("nico", "las", "니꼬")

        nico.firstName  // private이기 때문에 작동 안됨
        nico.nickname
        ```

2. abstract 클래스
    - 다른 클래스가 상속받을 수 있는 클래스
    - 단, 직접 새로운 인스턴스를 만들 수는 없고, 다른 클래스에 상속만 할 수 있음
    ```js
    abstract class User {
        constructor(
            private firstName: string,
            private lastName: string,
            public nickname: string,
        ) {}
    }

    // private, public는 JS에서 안 보임, 반영된 것인지 알 수 없음
    class Player extends User {
    }
    
    const nico2 = new Player("nico", "las", "니꼬") // abstract 클래스: 직접 새로운 인스턴스를 만들 수는 없음

    nico2.firstName  // private이기 때문에 작동 안됨
    nico2.nickname
    ```

3. abstract 메소드
    ```js
    abstract class User {
        constructor(
            private firstName: string,
            private lastName: string,
            public nickname: string,
        ) {}
        getFullName() {
            return `${this.firstName} ${this.lastName}`
        }
    }

    // private, public는 JS에서 안 보임, 반영된 것인지 알 수 없음
    class Player extends User {
    }
    
    const nico = new Player("nico", "las", "니꼬") // abstract 클래스: 직접 새로운 인스턴스를 만들 수는 없음

    nico.getFullName()
    ```
4. protected & abstract 메소드
    ```js
    abstract class User {
        constructor(
            protected firstName: string,
            protected lastName: string,
            protected nickname: string,
        ) {}
        abstract getNickName(): void
        getFullName() {
            return `${this.firstName} ${this.lastName}`
        }
    }

    // private, public는 JS에서 안 보임, 반영된 것인지 알 수 없음
    class Player extends User {
        getNickName() {
            console.log(this.nickname)
        }
    }
    
    const nico = new Player("nico", "las", "니꼬") // abstract 클래스: 직접 새로운 인스턴스를 만들 수는 없음

    nico.nickname() // protected 변수: 직접 새로운 인스턴스에서 사용할 수 없음
    nico.getFullName()
    ```

5. 해시맵
    ```js
    type Words = {
        [key: string]: string
    }

    class Dict{
        private words: Words
        constructor() {     // words 수동으로 초기화
            this.words = {}
        }
        add(word: Word) {
            if (this.words[word.term] === undefined) {
                this.words[word.term] = word.def
            }
        }
        def(term: string) {
            return this.words[term]
        }
    }

    class Word {
        constructor(
            public term: string,
            public def: string,
        ) {}
    }

    const kimchi = new Word("kimchi", "한식");
    const dict = new Dict()
    dict.add(kimchi);
    dict.def("kimchi")
    ```

4. static 메소드
    ```js
        class Dict{
            ...
            static hello() {
            return "hello"
            }
        }
    ```

5. 타입을 특정 값으로만 지정하기
    ```js
        type Nickname = string
        type Health = number
        type Friends = Array<string>

        type Team = string   // 모든 string이 가능: 타입 alias

        type Team = "red" | "blue" | "yellow" // 타입을 특정 값으로만 지정
        type Health2 = 1 | 5 | 10
    ```

## Interfaces
- 오브젝트 모양을 설명하는 또 다른 방법
- 오브젝트 모양을 특정해주기 위한 역할만 함
- 객체 지향 프로그래밍 개념을 활용해 디자인 됨
- JS로 컴파일 되지 않고 사라짐 => 가벼움

1. 오브젝트 모양 특정하기
    - 기존 오브젝트 & 인터페이스 => 두 코드 모두 동일
    - type은 오브젝트만 정의해주는 것이 아니지만, interface는 오브젝트 모양만 정의함

    ```js
        // 1. type을 쓰고 오브젝트 모양 써주기
        type Player = {
           nickname: string,
           team: Team,
           health: Health2
        }

        // 2. interface로 오브젝트 모양 써주기
        interface Player {
        nickname: string,
        team: Team,
        health: Health2
        }

        // 3. interface로 다른 타입을 정의할 수 없음
        interface Hello = string //=> ERROR: interface는 오브젝트만 정의
    ```

2. 중복된 interface는 TS가 알아서 합쳐줌
    ```js
        interface User {
            name: string
        }
        interface User { 
            lastName: string
        }
        interface User {
            health: number
        }
        
        // interface 합쳐짐
        const nico: User = {
            name: "nico",
            lastName: "wow",
            health: 1,
        }
    ```
    > type을 사용하면 ERROR 발생

3. 추상 클래스 > 인터페이스로 변경하기
    - 추상 클래스
        ```js
            abstract class User {
                constructor (
                    protected firstName: string,
                    protected lastName: string,
                ) {}
                abstract sayHi(name: string): string,
                abstract fullName(): string,
            }

            class Player extends User {
                fullName() {
                    return `${this.firstName} ${this.lastName}`
                }
                sayHi(name: string) {
                    return `Hello ${name}`
                }
            }
        ```

    - Interface
        ```js
            interface User {
                firstName: string,
                lastName: string,

                sayHi(name: string): string,
                fullName(): string,
            }

            interface Human {
                health, number
            }

            // extends => implements: 코드가 가벼워짐
            // JS에서는 상속받은 User 인터페이스를 추적할 수 없다.
            class Player implements User, Human {
                constructor(
                    public firstName: string,  // interface를 상속하면 property를 private 또는 protected로 만들지 못함! => 무조건 public
                    public lastName: string,
                    public health: number,
                ) {}
                fullName() {
                    return `${this.firstName} ${this.lastName}`
                }
                sayHi(name: string) {
                    return `Hello ${name}`
                }
            }
        ```
        > 내 생각: 기본 정보 + 알파일때 활용할 수 있지 않을까?