+++
title = "Typescript Monad"
author = ["Chop Tr (chop.dev)"]
summary = "Tìm hiểu về monad qua Typescript"
date = 2022-08-15T00:00:00+07:00
tags = ["typescript", "monad", "programing", "design", "pattern"]
draft = false
+++

## Youtube Video {#youtube-video}

<https://www.youtube.com/watch?v=h4GZkJsRySg>


## Intro {#intro}

Nếu tui phải chọn một thứ khó tiếp cận nhất trong việc học Lập trình thì `Monad` sẽ là một ứng cử viên nặng ký cho vị trí đầu tiên.

Nghe mấy cụm từ chuyên khoa hoành tá tráng như <span class="underline">endofunctor</span> và <span class="underline">monoid</span> nghe mà phát ớn muốn chạy đi luôn.

Nhg mà chậm lại chút để nhìn thì Monads là pattern lập trình cực kỳ hữu ích có thể được áp dụng dễ dàng mà không cần bất kỳ kiến thức toán học nào.

Trong video này, chúng ta sẽ tìm hiểu monad là gì và chúng hữu ích như thế nào. Rồi xem một số ví dụ các Monads phổ biến.


### Basic code {#basic-code}

Chúng ta sẽ bắt đầu với một vài đoạn code đơn giản viết bằng Typescript.

Đây là 2 functions làm nhiệm vụ rất đơn giản: Square - Bình phương biến nhận vào và AddOne - Cộng một.

Ok, nếu chúng ta chạy Square của AddOne của 2 thì kết quả sẽ là 5.

Đơn giản thôi ha.

```typescript
function square(x: number): number {
  return x * x
}

function addOne(x: number): number {
  return x + 1
}

addOne(square(2)) // 5

```


### NumberWithLogs {#numberwithlogs}

Đề bài trên khá đơn giản. Bây giờ mình extends nó, mở rộng yêu cầu ra thêm.

Giờ mình muốn log ra kết quả của mấy cái hàm này theo thứ tự mà tụi nó diễn ra.

Là mình muốn xem theo từng bước và kế quả của mỗi hàm.

Ví dụ ở trên khi mà addOne cho square của 2 thì sẽ là như vầy.

```json
{
  "result": 5,
  "logs": [
    "Square 2 => 4",
    "Add 1 to 4 => 5"
  ]
}
```

Như các bạn thấy cái kết quả `result` là 5 là kết quả cuối của phép tính.

Cùng với nó là 1 cái mảng `logs` mà mỗi phép tính sẽ thêm vào 1 chuỗi, diễn tả ra cái hành động của từng bước.

Tình huống thực tế thì việc log ra như vầy gặp khá nhiều trong các hệ thống mà mỗi bước của đều phải ghi lại hành động của nó để sau này truy lại debug hoặc phân tích (analytic).

Ở đây thì bạn nào xài linux systemd và journal đồ sẽ hiểu, nhg đó là 1 câu chuyện khác.

Ok. và chúng ta sẽ thực hiện code cái này như thế nào đây.


### Implement {#implement}

Đầu tiên chúng ta sẽ định nghĩa 1 cái cấu trúc để return ha.

Như mẫu json trên thôi.

Chúng ta gọi nó là `NumberWithLogs`. Nó có trường - key - result có kiểu number và key logs có kiểu mảng string.

```typescript
interface NumberWithLogs {
  result: number,
  logs: string[],
}
```

Tiếp theo chúng ta sẽ chỉnh lại hàm square và addOne để nó trả về cái gía trị theo cái interface vừa tạo.

```typescript
function square(x: number): NumberWithLogs {
  return {
    result: x * x,
    logs: [`Square ${x} => ${x * x}`]
  }
}

function addOne(x: NumberWithLogs): NumberWithLogs {
  return {
    result: x.result + 1,
    logs: x.logs.concat([`Add 1 to ${x.result} => ${x.result + 1}`]),
  }
}
```

Hàm string thì nhận vào number và trả về NumberWithLogs.

Hàm addOne chúng ta nhận vào thay vì 1 số thì là 1 cái NumberWithLogs để kết hợp với cái log của square bằng cách concat tụi nó lại với nhau.

Ok. Vấn đề đc giải quyết. `addOne(square(2))` sẽ trả về 1 cái NumberWithLogs đẹp đẽ eazi pi zì ha.


### Improve {#improve}

Tuy là chương trình chạy đó, nhưng mà có một vài vấn đề với cách xử lý này.

Thử nghĩ rộng ra, vấn đề thay đổi một chút, bạn muốn bình phương 2 lần 1 số thì sao, ví dụ square của square của 2.

```typescript
square(square(2)) // Error: Argument of type 'NumberWithLogs' is not assignable to parameter of type 'number'
```

Nó sẽ hok ra kết quả mong muốn vì cái hàm square đầu tiên nó trả về 1 cái NumberWithLogs nhưng mà cái square thứ 2 thì cần nhận vào 1 cái nunmber.

Hay mình muốn cộng 1 với số 5, cũng hok chạy vì hàm addOne nhận vào 1 cái NumberWithLogs chứ hok phải 1 con số number.

```typescript
addOne(5) // Error: Argument of type 'number' is not assignable to parameter of type 'NumberWithLogs'
```

Chúng ta sẽ cải tiến chương trình 1 chút bằng 1 cái hàm mới gọi là `wrapWithLogs`, nhận vào 1 con số number và trả về 1 cục NumberWithLogs.

Các bạn có thể hiểu kiểu kiểu như 1 cái constructor.

```typescript
function wrapWithLogs(x: number): NumberWithLogs {
  return {
    result: x,
    logs: [],
  }
}
```

Nó có tác dụng đưa cái input dạng number vô cái hệ thống NumberWithLogs. Chuyển hoá cho các hàm xử lý với môi trường NumberWithLogs.

Trong này mình để cái mảng logs là 1 mảng rỗng để concat log tiếp theo.

Bây giờ chúng ta có thể tiếp tục xử lý việc cải tiến 2 hàm trên.

Đầu tiên là xử lý hàm square để nó nhận vào NumberWithLogs.

Đối với addOne thì chúng ta có thể giữ như cũ và dùng hàm wrapWithLogs để đưa 1 con số number nhận vào.

```typescript
function square(x: NumberWithLogs): NumberWithLogs {
  return {
    result: x.result * x.result,
    logs: x.logs.concat([`Square ${x.result} => ${x.result * x.result}`]),
  }
}

function addOne(x: NumberWithLogs): NumberWithLogs {
  return {
    result: x.result + 1,
    logs: x.logs.concat([`Add 1 to ${x.result} => ${x.result + 1}`]),
  }
}
```

Ok. Chúng ta đã có thể gọi square cho square cho 2 đc rồi.

Và addOne cũng chạy luôn với việc wrap con số nhận vào lại bằng hàm wrapWithLogs như sau.

```typescript
square(square(wrapWithLogs(2)))
addOne(wrapWithLogs(4))
```


### Refactor {#refactor}

Nhìn tới đây thì các bạn lập trình có kinh nghiệm sẽ thấy ngứa. Có 1 vài logic bị trùng lặp giữa square và addOne.

Ở chỗ là cả 2 đều xử lý `logs.concat`. Chúng ta hãy refactor chỗ này ra một chút.

Đầu tiên là sắp sếp code lại ha.

```typescript
function square(x: NumberWithLogs): NumberWithLogs {
  const newNumberWithLogs = {
    result: x.result * x.result,
    logs: [`Square ${x.result} => ${x.result * x.result}`],
  }
  return {
    result: newNumberWithLogs.result,
    logs: x.logs.concat(newNumberWithLogs.logs),
  }
}
```

Đây là chung 1 logic thôi mình chỉ sắp sếp lại đưa phần tạo 1 cái NumberWithLogs ra ngoài.

Mục đích là để xử lý bằng một hàm mới mà mình sẽ viết tiếp theo đây. Là hàm `runWithLogs`.

Nó sẽ xử lý việc nối logs - là cái logs.concat - cho chúng ta thay vì cách xử lý cũ.

Chúng ta sẽ xài nó như vầy.

```typescript
// OLD
addOne(wrapWithLogs(5))

// NEW
runWithLogs(wrapWithLogs(5), addOne)
```

Ok. Và cái runWithLogs đc implement như sau.

```typescript
function runWithLogs(
    input: NumberWithLogs,
    transform: (_input: number) => NumberWithLogs
): NumberWithLogs {
  const newNumberWithLogs = transform(input.result)
  return {
    result: newNumberWithLogs.result,
    logs: x.logs.concat(newNumberWithLogs.logs),
  }
}
```

Cái hàm transform nhận vào ko phải là giá trị nữa mà là 1 cái hàm luôn.

Hàm này có nhiện vụ tạo ra cái `newNumberWithLogs` mà chúng ta sẽ trả về.

Cái khúc logic return ở đây các bạn để ý là y hệt cái logic đc sắp sếp lại ở trên.

Như các bạn cũng thấy transform có dạng `(_input: number) ==> NumberWithLogs`.

Chúng ta sẽ viết lại 2 hàm square và addOne ở dạng này như sau.

Thực ra đây là dạng đơn giản cũ lúc đầu.

```typescript
function square(x: number): NumberWithLogs {
  return {
    result: x * x,
    logs: [`Square ${x} => ${x * x}`]
  }
}

function addOne(x: number): NumberWithLogs {
  return {
    result: x + 1,
    logs: [`Add 1 to ${x} => ${x + 1}`],
  }
}
```

Cả 2 hàm square và addOne đều nhận vào 1 number x và trả về NumberWithLogs.

Bên trong nó thì thực hiện việc tính toán như bình phương hay cộng 1 đối với result.

Còn logs thì là 1 cái mảng 1 phần tử chứa cái string mà mình cần.

Dòm thì nhiều code cho cái việc đơn giản là log ra thôi ha.

Nhg mà để ý kỹ thì các bạn sẽ thấy các hàm làm đúng nhiệm vụ của mình.

square - chúng ta cần bình phương và log. addOne - chúng ta cần cộng 1 và log.

Chương trình trở nên đơn giản hơn và linh hoạt hơn.

square và addOne ko còn cần phải concat logs nữa và giá trị nhận vào ở dạng đơn giản 1 con số number thôi.


### Conclusion {#conclusion}

Ok. refactor 1 hồi thì code ngon rồi. Chúng ta có thể tuỳ biến sử dụng các phép tính theo thứ tự nào cũng đc.

Hay cả khi thêm phép tính khác, ví dụ nhân 3 đi - multiplyThree. Chỉ cần viến thêm 1 hàm đơn giản như trên, và nó sẽ chạy với runWithLogs.

```typescript
function multiplyThree(x: number): NumberWithLogs {
  return {
    result: x * 3,
    logs: [`Multiply ${x} with 3 => ${x * 1}`],
  }
}
```

Và những thứ ma thuật phía trong như log.concat đc chạy trong 1 chỗ thôi.

```typescript
const a = wrapWithLogs(5)
const b = runWithLogs(a, addOne)
const c = runWithLogs(b, square)
```

Oki. Làm nãy giờ thì các bạn cũng sẽ tự hỏi. Monad đâu vậy Chop.

Ờ thì chúng ta mới viết 1 cái monad đó.

Monad cốt lõi của nó là 1 cái design pattern, một kiểu lập trình và chúng ta vừa trải nghiệm.

Hy vọng nó ko quá khó để hiểu và qua các bạn cũng cảm đc cái giá trị của nó.

Monad cho phép chúng ta xâu chuỗi lại các hoạt động của chương trình như square, addOne, còn nó thì bí mật quản lý các công việc khác ở bên trong.

Trong trường hợp này là kết hợp với việc log kết quả chương trình.


## Monad {#monad}


### Three Components {#three-components}

Tất cả monad đều có 3 phần hay gọi là components.

Đầu tiên là 1 cái wrapper tạo ra cái kiểu gói của cái monad.

Trong ví dụ vừa rồi là cái NumberWithLogs.

Thứ 2 là cái hàm nhận vào 1 giá trị có kiểu cơ bản và wrap - gói lại - trong cái monad. Một dạng constructor.

Trong ví dụ vừa rồi là hàm wrapWithLogs.

Cuối cùng, Monad cần 1 cái hàm nhận vào cái kiểu đã đc gói và 1 cái hàm để transform - chuyển hoá.

Hàm chuyển hoá này nhận vào cái kiểu cơ bản và trả về kiểu đã đc gói. Ở đây là runWithLogs.

| Components    | Example                                                                                                   |
|---------------|-----------------------------------------------------------------------------------------------------------|
| Wrapper type  | NumberWithLogs                                                                                            |
| Wrap Function | function wrapWithLogs(x: number): NumberWithLogs                                                          |
| Run Function  | function runWithLogs(input: NumberWithLogs, transform: (_: number) =&gt; NumberWithLogs)): NumberWithLogs |


### Option aka Maybe {#option-aka-maybe}

Chúng ta có thể đi qua một số monad phổ biến để hiểu hơn về công dụng của nó.

Ví dụ điển hình là Option hay còn đc biết đến với tên Maybe.

Nó đại diện cho 1 kiểu giá trị mà có thể không tồn tại.

Kiểu dữ liệu number đại diện cho tất cả các con số 0, 1, 2, 3, -1, -2, 3, 3.1415, v.v

Còn 1 cái Option&lt;number&gt; đại diện cho kiểu có hoặc ko tồn tại một con số.

Tương tự Option&lt;User&gt; đại diện cho kiểu có hoặc ko một User.

Nó như kiểu là 1 thứ có thể null hoặc undefined nhưng mà đc trình bày rõ ràng ra để xử lý an toàn và dễ dàng hơn trong quá trình compile code.

Chúng ta sẽ đi qua 3 cái components cho monad này.


#### Wrapper Type {#wrapper-type}

Cái wrapper thực ra thường là `Generic`. Có nghĩa là nó có thể wrap nhiều loại - Type - kiểu chứ ko bắt buộc phải là number.

Kiểu string cũng đc, number cũng đc, Date cũng đc, v.v

Chúng ta dùng &lt;T&gt; để diễn đạt rằng nó là Generic.

Thực ra hầu hết các Monad đều Generic.

Mà trong cái ví dụ NumberWithLogs mình muốn xử lý đơn giản cho dễ hiểu nên xử lý trên number nên cái tên NumberWithLogs.

Chúng ta có thể đổi lại thành ThingWithLogs&lt;T&gt; và chuyển cái result thành kiểu T thì nó sẽ Generic.

```typescript
interface ThingWithLogs<T>{
  result: T,
  logs: string[],
}
```


#### Wrap Function {#wrap-function}

Tiếp theo chúng ta cần hàm để gói cái kiểu cơ bản &lt;T&gt; thành Option.

Ở đây nó là `some<T>(v: T)` vì nó diễn đạt cho thứ mà nó là 'something' thay vì không có gì 'nothing'.

Với ko có gì 'nothing' thì nó là `none`.


#### Run Function {#run-function}

Cuối cùng là 1 cái hàm để chạy, `run function`, nhận vào 1 cái Option và 1 cái hàm transform để chạy như chúng ta đã tìm hiểu ở trên.

```typescript
function run<T>(input: Option<T>, transform: (_input: T) => Option<T>): Option<T> {
  if (input == none) {
    return none
  }
  return transform(input.value)
}
```

Hàm này chạy như sau, nếu nhận vào giá trị là none thì nó sẽ trả về none luôn.

Còn nếu nhận vào giá trị gì đó ko phải none (là some cái gì đó) thì nó sẽ chạy tiếp băng hàm transform.

Cho phép bạn xâu chuỗi các operations lại mà ko cần phải lo lắn về các giá trị none.

Chúng ta sẽ đi qua 1 cái ví dụ dụ để xẹm sự hữu dụng của nó.


#### Example {#example}

Ví dụ trường hợp chúng ta muốn fetch về 1 user và lấy ra object con pet (vật nuôi) và sau đó lấy ra tên con vật nuôi đó.

Ở đây các trường đều có thể bị thiếu, ko tồn tại.

Đây là code mà ko sử dụng monad Option.

```typescript
function getPetNickname(): string | undefined {
  const user: User | undefined = getUser()
  if (user === undefined) {
    return undefined
  }

  const userPet: Pet | undefined = getPet(user)
  if (userPet === undefined) {
    return undefined
  }

  const userPetName: string | undefined = getNickName(userPet)
  return userPetNickName
}
```

Chúng ta đầu tiên sẽ fetch user về bằng hàm getUser. Nó trả về kiểu User hoặc undefined.

Rồi check undefined nếu đúng thì sẽ ngưng và trả về undefined luôn.

Chúng ta sẽ làm như vậy với user Pet.

Cuối cùng thì userPetName có dạng string hoặc undefined thì đc trả về luôn.

Như các bạn thấy.

Mỗi lần chúng ta chạy qua 1 cái operation chúng ta đều phải kiểm tra xem là cái kết quả nó có undefined hay ko và ngắt ngay chỗ đó return ra.

Một dạng short circuit (bạn nào học điện tử sẽ hiểu :D).

Cái syntax check undefined này khá phổ biến trong typescript vì giá trị bị thiếu hay ko tồn tại thường được diễn đạt dưới dạng undefined hoặc null.

Thử xem code sử dụng monad Option sẽ như thế nào.

```typescript
function getPetNickname(): Option<string> {
  const user: Option<User> = getUser()
  const userPet: Option<Pet> = run(user, getPet)
  const userPetName: Option<string> = run(userPet, getNickName)
  return userPetName
}
```

Code này đơn giản hơn nhiều so với kiểu check undefined trên.

Trong code này cái value cần đc trả về được diễn đạt ra rõ. Và việc kiểm tra undefined xảy ra tự động. Ko cần phải xử lý thủ công như trên.

Các ma thuật đc xử lý trong hàm run.

Ở đây các bạn cũng lưu ý là khi user hoặc userPet là none thì các hàm getPet hay getNickName đều sẽ ko chạy.

Cũng giống với cái implement trên thôi.

Một vài ngôn ngữ khác cho phép việc xâu chuỗi các monad lại với nhau code còn trở nên gọn và đơn giản hơn như vầy nữa.

Ví dụ như haskell chúng ta có dấu `>>` để xử lý việc xâu chuỗi này lại.

Cái function trên chỉ còn 1 dòng.

```haskell
getPetNickname :: Maybe String
getPetNickname = getUser >> getPet >> getPetName
```


## Monad land {#monad-land}


### Design Pattern {#design-pattern}

Như các bạn thấy, monad là một cái `design pattern`, cho phép chúng ta xâu chuỗi các logic operation của chương trình với nhau.

Các logic như getUserName, getPetName, addOne, square, v.v.

Còn monads sẽ xử lý các công việc xung quanh tự động - hơi magic, ma thuật, ảo diệu một chút - ở bên dưới.

Trong trường hợp NumberWithLogs thì là xử lý in các dòng log ra console.

Trong trường hợp Option là xử lý các giá trị bị thiếu hay ko tồn tại.

Còn kha khá nhiều monads hữu dụng khác nữa mà các bạn có thể tìm hiểu thêm.


### The Magic {#the-magic}

Hình vẽ này thì mình đào sâu thêm tí về cái ma thuật đằng sau của monad.

<img src="./typescript-monad-monad-land.org_20220815_204234.png" width="600" />

Nói chung thì cái dòng chảy của chương trình xử dụng monad nó diễn ra như sau.

Chúng ta bắt đầu bằng một giá trị căn bản chưa wrap lại.

Sau đó chúng ta gói nó lại, đi vào thế giới Monad - tạm gọi Monad Land.

Cái hàm run có khả năng unwrap - mở monad ra - xử lý nó dưới kiểu căn bản bằng hàm transform, xử lý tiếp các ma thuật bên trong của nó.

Xong gói lại và trả về Monad Land.

Cứ vậy dữ liệu đc xử lý và chuyển đổi qua lại giữa môi trường căn bản và môi trường Monad.


## Conclusion {#conclusion}

Ok. Túm lại thì qua video này chúng ta đã hiểu thêm đc gì?

Đầu tiên, Monad là một design pattern rất hữu dụng trong lập trình.

Vì chúng cho phép chúng ta xâu chuỗi các operations xử lý logic lại với nhau.

Trong lúc đó chúng thực hiện các thủ tục ma thuật liên quan hoặc các xử lý phức tạp lặp đi lặp lại khác.

Khi xử lý monad, flow của kiểu dữ liệu bắt đầu từ thể căn bản - unwrapped - sau đc đc gói lại đưa vào thế giới Monad.

Sau đó chúng ta viết các hàm transform là các hàm xử lý operation logic trên kiểu dữ liệu ban đầu.

Rồi sử dụng 1 hàm để run cái cái transform đó trên cục dữ liệu monad đã đc wrap.

Và các monad thường đc implement generic, có thể gói bất kỳ kiểu dữ liệu nào.

Ví dụ điển hình của monad là Option&lt;T&gt;.

Hy vọng video này bổ ích cho các bạn trong việc tìm hiểu lập trình.

Xin chào và hẹn gặp lại trong video sau.

Chop out.
