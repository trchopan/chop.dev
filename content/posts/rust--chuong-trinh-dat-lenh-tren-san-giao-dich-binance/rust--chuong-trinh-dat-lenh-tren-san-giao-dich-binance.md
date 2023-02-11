+++
title = "Rust: Chương trình đặt lệnh trên sàn giao dịch Binance"
author = ["Chop Tr (chop.dev)"]
description = "Lập trình với các sàn giao dịch là một trong những kiến thức miền khá là hữu dụng của một lập trình viên. Năm vừa rồi thì mình có cơ hội lập trình cho một dự án nhỏ với một nhóm trading ở Vietnam. Video này demo một chương trình cơ bản thực hiện việc đặt lệnh và kiểm tra tài khoản trên sàn giao dịch tiền điện tử Binance."
date = 2023-02-08T00:00:00+07:00
tags = ["rust", "clap", "binance", "programming", "trading"]
draft = false
cover = "/posts/rust--chuong-trinh-dat-lenh-tren-san-giao-dich-binance/rust--chuong-trinh-dat-lenh-tren-san-giao-dich-binance-0.jpg"
+++

# Video

[https://www.youtube.com/watch?v=gqHsMtzrKaY](https://www.youtube.com/watch?v=gqHsMtzrKaY)

# Intro

Hi. Xin chào các bạn. Chop trở lại với 1 video mới. Video lần này là về lập trình Rust.

Video này mình sẽ xử lý việc thao tác các giao dịch trên sàn giao dịch tiền điện tử Binance. Bạn nào từng trading crypto thì chắc cũng biết qua sàn này, một trong những sàn giao dịch tiền điện tử lớn nhất thế giới. Demo ở đây sẽ áp dụng với API của Binance nhưng các bạn cũng có thể phát triển đối với các sàn khác.

Thì với Binance hay sàn nào cũng vậy thường họ có mở cho chúng ta các APIs để thực hiện việc trading. Các bạn chuyên gia về trading, hay các công ty dùng kỹ thuật cao để trade có khả năng thiết kế các chiến lược trading có hiệu suất cao và sử dụng chương trình máy tính để đặt lệnh.

Thì các nhóm trading hay công ty này sẽ thường sẽ tìm đến các developers có kỹ năng thực hiện việc xây dựng các con bot đặt lệnh để kết nối vào sàn giao dịch và trade tự động thay vì giao dịch truyền thống kiểu nhìn bảng lệnh đặt lệnh.

Trước khi thực hiện tác vụ business logic thì chúng ta đi sơ qua một chút về những thứ sẽ làm ha.

Con bot sẽ thực hiện được các tác vụ sau:

- Lấy giá của một symbol
- Lấy account balance
- Lấy danh sách các lệnh order bao gồm trạng thái và nội dung đặt lệnh
- Tạo ra các order và gửi lệnh lên Binance

Thì đối với tác vụ lập trình nào cũng vậy. Chúng ta phải nghiên cứu ngôn ngữ miền, chính là các từ ngữ được sử dụng trong công việc của miền (mình định nghĩa miền là mảng chuyên môn mà chúng ta đang xử lý).

Ở đây thì thói quen công việc thôi, mình là đồ đệ của phái Domain Driven Design nên đối với mình việc nghiên cứu và làm rõ ngôn ngữ để trao đổi giữa các bên này rất quan trọng.

Đi sơ qua thì có các khái niệm cần nắm là

- Symbol là các mã giao dịch. Đối với crypto thì nó là BTCUSDT, ETHBUSD, là kết hợp giữa một bên là tài sản và một bên là tiền tệ. Đối với chứng khoán thì là các mã như Tesla - TSLA, Amazon - AMZN, Vinhome - VHM, v.v
- Account balance là số dư tài khoản, là liệt kê ra trong tài khoản của các bạn có bao nhiêu loại tài sản, mỗi loại có số lượng bao nhiêu.
- Lệnh hay Order là yêu cầu mua hoặc bán, được gửi lên sàn giao dịch. Khi khớp nhu cầu, bên mua tìm thấy bên bán hoặc ngược lại thì lệnh sẽ được thực hiện và giao dịch giữa 2 bên được xử lý.

Trong video này chúng ta sẽ demo được các tác vụ lập trình sau:

- Nghiên cứu và thao tác API của một sàn giao dịch tiền điện tử
- Xử lý cấu trúc thông tin trả về cũng như thông tin truyền lên API
- Xử lý mã hoá các lệnh gọi sử dụng HMAC SHA256 (việc xử lý mã hoá này khá phổ biến, mình sẽ đề cập kỹ hơn khi đề cập đến nó trong phần tiếp theo khi đi qua document)

# Preparations

## Document

Ok. Thì để chuẩn bị cho việc thi công code. Chúng ta sẽ phải nghiên cứu các tài liệu Document trước.

Đầu tiên là document của Binance API. Các bạn có thể xem qua link sau.

Đi qua document này thì chúng ta sẽ tập trung vào các thông tin API mà chúng ta cần gọi lên. Và bên phải sẽ là dữ liệu mẫu mà Binance trả về chúng ta sẽ phải xử lý dữ liệu này dạng struct cua Rust trong lúc code.

Ví dụ thử một vài API mà chúng ta sẽ sử dụng đi từ đơn giản đến phức tạp ha.

Đầu tiên là API để lấy giá của một symbol. Chính là 

```
GET /api/v3/avgPrice
```

Ở đây thì chúng ta sẽ phải truyền lên symbol mà chúng ta cần lấy về giá của nó. Ví dụ

```
GET /api/v3/avgPrice?symbol=BTCUSDT
```

Và kiểu dữ liệu chúng ta nhận về sẽ có dạng như sau.

Cái field mins ở đây là số phút mà giá này lấy trung bình ra. Và field price là trung bình giá của symbol.

Tiếp theo chúng ta sẽ thử xem qua API để lấy Account Balance. Chính là

```
GET /api/v3/account (HMAC SHA256)
```

Ở đây document có ghi là HMAC SHA256. Thì ở đây chúng ta sẽ phải xử lý việc mã hóa lệnh gọi sử dụng HMAC SHA256 ha.

HMAC viết tắc của "key-hashed message authentication code" còn SHA256 là thuật toán để hash.

Thì kéo Document lên trên sẽ có 1 mục tên là "SIGNED Endpoint security". Ở đây mô tả kỹ hơn về cách thức mà chúng ta sẽ thực hiện việc hash cái request như thế nào.

Chúng ta cần cung cấp một cái "signature" là chữ ký cho lệnh được gửi lên. Chữ ký này sẽ được thực hiện bằng cái secretKey mà Binance cung cấp. Chút nữa sẽ đi qua phần lấy cái apiKey và secretKey sau ha.

Rồi để làm cách nào tạo ra cái signature này.

Ở đây document ghi là sử dụng các params của request để làm value. Kết hợp với 1 khái niệm gọi là Timing Security là đính kèm các params một cái Timestamp thời gian hiện tại để gửi lên. Mục đích là để chống lại timing attack, nếu request của các bạn không có timing thì attacker có thể copy lệnh này và gửi lên nhiều lần để đặt lệnh.

Timestamp này sẽ giúp Binance so sánh với timestamp của server và sẽ expire hay timeout nếu lệnh của các bạn không nằm trong khoản 5 giây receiving window.

Chúng ta sẽ dùng "secret Key" là chìa khóa để ký một chuỗi ký tự. Thuật toán để ký ghi ở đây là SHA256. Ký lên query params cộng cái timestamp. Sau đó kèm chữ ký signature này để request truyền lên Binance.

Phân tích thêm 1 chút thì các bạn ở đây có thể hình dung là khi cần thực thi request. Binance sẽ cần xác nhận danh tính của người gọi và chỉ khi xác định đúng chính xác thì mới thực hiện request.

Thì việc chúng ta đang làm là tạo ra 1 cái yêu cầu, sau đó ký tên lên cái yêu cầu này, rồi gửi nó cho Binance.

Cách thức ký băng HMAC SHA256 này khá phổ biến, không chỉ với Binance mà các API về tài chính khác cũng dùng. Ví dụ như ở Vietnam thì mình cũng đã từng xử lý với API của Momo, cũng thực hiện việc ký các request cũng tương tự. Với Momo thì nó dùng thuật toán RSA thay vì SHA256.

Ok thì với account API thì đơn giản là GET /api/v3/account với timestamp và signature thôi.

Còn với API phức tạp hơn thì chúng ta sẽ có thêm các cái trường bắt buộc trong query nữa.

Thử xem 1 API nữa mà chúng ta sẽ dùng đó là

```
GET /api/v3/allOrders (HMAC SHA256)
```

Ở đây thì chúng ta phải gửi lên 1 cái trường bắt buộc trong query là symbol để lọc ra tất cả lệnh giao dịch với symbol đó.

Một API nữa là New Order

```
POST /api/v3/order (HMAC SHA256)
```

Trong này thì có nhiều trường bắt buộc hơn. Đầu tiên là symbol mã giao dịch, side là lệnh bên nào, Mua là BUY hay Bán là SELL. Tiếp theo là type, là kiểu của cái Order này.

Ở đây thì mình demo kiểu order là MARKET thôi là gửi lệnh mua hoặc bán với giá hiện tại. Ngoài Market Order thì sẽ có nhiều loại nữa như Limit, Stop Loss, Take Profit, v.v Các bạn có thể tìm hiểu sâu hơn về các lệnh này và trading sau ha.

## Test Account

Ok giờ thì chúng ta sẽ đi qua phần lấy API key và Secret key để bắt đầu code thử nghiệm việc thao tác với Binance API.

Thì Binance có cho chúng ta một cái testnet, là nơi mà lập trình viên như mình có thể thao tác với API mà không cần phải có tài khoản thực trên sàn.

Tài khoản trên Testnet thì các bạn sẽ tự động được cung cấp một số lượng Crypto để giao dịch. Và có thể Generate một hoặc nhiều cái chìa khóa api và secretKey để thử nghiệm.

Các bạn có thể vào trang sau để thiết lập tài khoản test [https://testnet.binance.vision/](https://testnet.binance.vision/)

Trong này thì nó Authenticate với tài khoản Github nên các bạn bắt buộc phải có tài khoản Github trước để Login ha.

Sau khi kết nối tài Khoản Github và Binance Testnet thì các bạn có thể nhấn vào "Generate HMAC_SHA256 Key" để tạo một bộ key. Cho nó một cái mô tả ngắn xong nhấn "Generate" là xong. Giữ kỹ 2 cái keys này lại chúng ta sẽ dùng nó để giao tiếp với Binance API.

# Code

Rồi chúng ta sẽ bắt đầu code thôi. Thì đầu tiên sẽ khởi tạo một project Rust mới mình gọi là binance-rs ha. Code trong này mình sẽ upload lên github các bạn có thể clone về để tự thử nghiệm. Link thì chắc sẽ thêm vào trong description sau.

## Clap - CLI argument

Thì để xử lý các tác vụ như đặt ra ở trên. Chúng ta sẽ thực hiện 1 cái CLI app là app ở dạng Command Line Interface để demo cách vận hành ha. Khi đã demo được cách vận hành thì việc phát triển thêm để trở thành 1 UI app hay một con bot tự động đặt lệnh là việc không khó. Thêm 1 cái layer lên trên cái Proof of Concept này thôi.

Để xử lý CLI app với Rust thì mình sẽ sử dụng crate Clap, là một crate xử lý CLI khá mạnh trong hệ sinh thái Rust. Thì nếu các bạn có xem qua video trước mình cũng đã dùng crate này để xử lý cho việc thiết lập chương trình. Các bạn có thể tham khảo thêm nếu đang tìm hiểu về dùng Rust để code API server sử dụng framework Axum như thế nào ở đây ha.

Quay lại, thì để thêm Clap vào chúng ta sẽ dùng lệnh:

```
cargo add clap –features derive
```

Chúng ta sẽ dùng feature derive để config clap ha.

Đối với Argument cho chương trình đầu tiên chúng ta sẽ có một cái cờ là config. Là một cái đường dẫn. Dạng PathBuff. Để truyền vào cho chương trình biết sẽ load config dùng file gì.

Có đường dẫn config file rồi thì chúng sẽ phải parse cái config file. Là đọc nội dung và xử lý nội dung thành một kiểu struct để sử dụng.

## Config

Ở đây mình sẽ đọc ra các config cho chương trình trong một toml file. Thì để setup, Rust có một crate nữa tên là config luôn.

Chúng ta sẽ thêm crate này vào

```
cargo add config –features toml
```

Thêm feature là toml ha.

Crate này sẽ giúp chúng ta parse nội dung config ra một kiểu dữ liệu mong muốn.

Để chuẩn bị cho kiểu dữ liệu đó chúng ta sẽ tạo 1 struct tên là AppConfig.

Trong này sẽ chứa các thông tin sau là api_key , secret_key và binance config.

Trong binance config sẽ là thông tin của endpoint Binance API mà chúng ta cần gọi lên là gì. Ở đây chúng ta có thể dễ dàng chuyển đổi giữa testnet xài testnet.binance.vision và mainnet xài api.binance.com .

Các cái trường còn lại get_account, get_avg_price, v.v là các cái API mà chúng ta đã nghiên cứu lúc nãy. Mình để ở đây để sau này dễ dàng hơn trong việc config thay vì hard coded.

Ok thì với struct trên chúng ta sẽ dùng 1 cái file config như sau.

Đây là dạng file toml ha, trong này thì mình sẽ điền cái api_key và secret_key lấy về lúc nãy generate trên binance testnet.

Ok và quay lại main function. Chúng ta sẽ lắp nó vào bằng Args::parse() sau đó chúng ta sẽ có cái config_path. Rồi dùng config builder, add_source cho nó là cái config_path, xong build rồi try_deserialize() nó thành AppConfig ha.

## Logging

Ok tới đây thì chúng ta cần debug xem ở các thông tin truyền vào chương trình có nhận được chính xác không.

Mình sẽ sử dụng 2 create để setup cho việc logging phục vụ debug ha.

Đó là crate env_logger và log.

Ok chạy cargo add env_logger và cargo add log

Thì để setup env_logger chúng ta sẽ sử dụng dòng sau. Ở đây setup default filter là debug, nếu cần thì các bạn có thể để level là info.

Ok và log ra thử config có đúng như mong muốn không.

Ok mọi việc ổn.

## Domain structs

Giờ mình sẽ chuẩn bị các struct để handle các kiểu dữ liệu. Các struct này sẽ mình sẽ sắp xếp vào một cái module là domain ha.

Setup cái domain module thì sẽ tạo thư mục domain trong này chứa file mod.rs. public ra 1 cái module là binance. module binance sẽ nằm trong file binance.rs ha.

Rồi để nối domain vào app thì chúng ta sẽ setup file lib.rs rồi public cái module domain này ra thôi.

Ok trong binance.rs thì nó sẽ chưa các struct cho cái các kiểu dữ liệu của BinanceAPI, cùng với một số struct khác sử dụng để thao tác trong chương trình.

Đầu tiên là BinanceKeyPair ở đây mình gom chung 2 cái key và secret lại với nhau để dễ xử lý thôi. Ở đây derive 2 traits là Debug và Clone là 2 trait standard của Rust.

Sau đó chúng ta sẽ xử lý các kiểu dữ liệu của Binance ha.

Kiểu dữ liệu Binance Account trả về từ API /account này. Chúng ta có thể vào lại Document để xem mẫu dữ liệu truyền về ở đây.

Thì mình sẽ copy mẫu dữ liệu này và dùng 1 cái tool nữa để xử lý đó là QuickType.io Tool này cũng được mình sử dụng trong các video trước ha. Các bạn có thể xem thêm trong những video đó.

Paste vào đây thì QuickType sẽ giúp chúng ta generate type cho các struct của Rust thôi. Đỡ mắc công gõ tay. Rồi copy các type này vào file binance.rs

Tới đây thì chúng ta cần thêm 1 crate nữa là serde để xử lý việc serialize và deserialize dữ liệu.

```
cargo add serde
```

Sử dụng thêm feature là derive ha.

Sẵn tiện thì thêm create serde_json va toml để xử lý việc serialize deserialize cho 2 kiểu này luôn.

cargo add serde_json và toml

Ok và như vậy chúng ta đã có thể xử lý data struct cho Binance API account rồi.

Chúng ta sẽ làm tương tự cho việc typing ra các struct khác cho Binance API ha. Thêm struct cho /avgPrice rồi struct cho order.

Ở đây thì để phân biệt với các loại account khác. Mình sẽ đặt tên cho các struct là BinanceSpotAccount, BinanceSpotOrder ha. Ngoài spot thì còn có các dạng trading margin, future, v.v

Tiếp theo chúng ta cần 1 cái struct cho cái request gửi lên Binance, gọi là BinanceSpotOrderRequest ha. Thì như tìm hiểu ở Document, chúng ta sẽ cần cái symbol, side, order_type và quantity.

Order side và order type mình sẽ đưa ra 2 cái enum riêng ha. Ở đây xài 1 cái features của serde là rename để xử lý việc serialize ra BUY SELL hay LIMIT MARKET là viết hoa thay vì viết thường trong code Rust.

Ok vậy là xong. Chúng ta có thể bắt đầu sử dụng các struct này để xử lý các tác vụ rồi.

## Infrastructure Repository

Chúng ta sẽ qua cái layer tiếp theo, bên trên layer domain. Là infrastructure

Layer này sẽ có nhiệm vụ sử dụng các thư viện trong hệ sinh thái rust để xử lý các tác vụ liên quan đến một miền nào đó. Ở đây là các tác vụ liên quan đến Binance. Mình sẽ tạo 1 cái module tên là BinanceRepo.

Cũng tương tự module domain. Chúng ta sẽ tạo thư mục infrastructure trong này chứa file mod.rs public ra module binance_repo và gắn nó vào lib.rs.

Quay lại Binance Repo thì để sử lý cho tác vụ giao tiếp với Binance chúng ta sẽ cần một loạt các crate sau. Chúng ta sẽ cargo add từng crate vào:

- Anyhow để xử lý handle Error
- chrono để xử lý timestamp
- hmac, sha2 và hex để xử lý ký signature cho các request
- Cuối cùng là reqwest để xử xử lý gởi HTTP request lên API. Vì đây là chương trình CLI nên mình sẽ sử dụng reqwest dạng blocking thay vì dạng default là async ha.

Ok, mình sẽ import 1 loạt các cái crate này vào trước ha.

Rồi. Và chúng ta sẽ short hand cái HmacSha256 này thành 1 cái type như vầy.

Xong tạo cái struct BinanceRepo là cái struct mô tả cái Repository này.

Trong này sẽ có cái config viết tắt là cfg. Sẽ chưa các config mà chúng ta đọc vào từ file truyền vào trong main lúc nãy. Các config này bao gồm các cái endpoint và API mà chúng ta sẽ dùng. Và sẽ được gán vào đi suốt vòng đời của cái Repo này.

Để tạo ra cái object binance repo thì sẽ dùng 1 public function, tên new này.

Truyền vào thông tin cần thiết là config dạng AppConfigBinance và cái keypair ha.

Trong này chúng ta sẽ khởi tạo cái client reqwest ở đây. Setup cái header chưa cái API key của binance trong header field X-MBX-APIKEY này ha. Và set cái timeout 10s luôn.

Client này sẽ được sử dụng chung cho cái repo object. Chúng ta sẽ không cần setup header cho từng request.

Tiếp theo là 1 cái function để tạo signature là để ký cái message mà chúng ta cần gửi lên Binance API.

Trong này là tác vụ dùng cái secretKey và thuật toán SHA256 để digest và tạo ra cái signature dạng bytes. Sau đó encode nó lại thành hexadecimal.

Tiếp theo là 1 cái helper function để compose cái query của reqwest theo như yêu cầu Timing security của Binance API. Ở đây dùng secret key cùng với cái vector chứa key value tuple de tạo ra vector có chứa timestamp và signature để reqwest gửi đi.

Ở đây mình shadow clone cái query rồi thêm field timestamp. Sau đó iterate qua các phần tử format lại thành dạng key = value, và nối chúng lại bằng dấu & để tạo ra cái string query. Rồi dùng helper create_signature ở trên ký tên lên cái string này. Xong nối nó vào query trả về.

Tiếp theo là 1 cái helper function nhỏ nữa là make_url. function này sẽ xử lý tác vụ đơn giản thôi là nối cái endpoint với cái API path.

Ok, nãy giờ là các private helper của BinanceRepo. Bây giờ chúng ta có thể dùng chúng để xử lý các lệnh gọi đến API của Binance để thử nghiệm rồi.

Tác vụ đầu tiên chúng ta sẽ xử lý là get account. Trong này thì ko có argument nào. Chỉ sử dụng self chính là cái object repo để chúng ta lấy các thông tin về config ra thôi.

Dạng trả về là Result của anyhow. Thì ở đây khác với Result của rust, anyhow nó giúp mình xử lý lỗi với ký tự ? là để bubble error lên trên dưới dạng anyhow::Error. Dạng anyhow::Error sẽ giúp mình handle error trực quan hơn cách xử lý thông thường trong code Rust, chút nữa mình sẽ demo cách refactor.

Thì với get_account đầu tiên chúng ta sẽ tạo query với vector rỗng. Chúng ta sẽ dùng compose_query để ký cái request ở đây với timestamp và signature như giải thích ở trên thôi.

Là có thể dùng reqwest để gửi lên API của Binance rồi. Trong này mình dùng make_url và self config để tạo nên cái full url.

Truyền vào cái query ở đây thôi.

Kết quả trả về mình sẽ ? để pipe cái error lên và xử lý tiếp cái response, gán vào biến resp này.

Thì có 1 điểm lưu lý ở đây là request gửi thành công là request gửi được lên server và nhận được response của server ha. Ở đây kể cả response status lỗi như 404 - Not Found hay 400 - Bad Request gì thì cũng là response ha. Nên chúng ta sẽ xử lý thêm việc check response có success hay không.

Sử dụng resp.status().is_success() này để kiểm tra và trả lỗi cho anyhow::Err thôi. Với anyhow::Error thì chúng ta impl 1 cái error trait và display trait cho 1 cái struct nữa. Ở đây mình tạo struct là ResponseError ha. Là 1 cái struct gói String lại thôi.

Trường hợp error thì trả về Status và cái text thôi thôi. Anyhow sẽ log cái error ra console giùm mình.

Nếu mọi việc ổn thì sẽ nhận về 1 cái account object và mình sẽ dùng .json để pase nó ra dạng struct BinanceSpotAccount. Handle trường hợp fail cũng sử dụng ký tự ? với context là failed json.

Cuối cùng là trả về result Ok wrap cái account lại thôi.

## Connect repository with main

Bây giờ thì chúng ta có thể nối repository BinanceRepo này với main.rs

Thì để xử lý chuong trinh CLI có nhiều tác vụ. Chúng ta sẽ dùng 1 cái enum tên là Command trong này derive SubCommand, sẽ được dùng để handle các command khác nhau cho từng tác vụ khác nhau.

Mình cũng sẽ sử dụng clap để config cho các subcommand. Đối với subcommand Account thì không có thêm argument gì. Ở đây mình sẽ thêm 3 command nữa là GetPrice và GetAllOrders với argument symbol, và NewOrder với argument là order config file, dạng PathBuff.

Thì để handle các subcommand chúng ta sẽ sử dụng expression match của rust để handle tất cả các case của subcommand. Các case mà mình chưa handle sẽ ở dạng todo! này.

Đầu tiên mình sẽ ví dụ với Command Account để get thông tin về tài khoản. Chính xác là số dư của các tài sản trong tài khoản ha. Nó sẽ dùng function get_account trong BinanceRepo để lấy thông tin và gán vào biến account.

Sau đó loop qua các tài sản asset, và xuất ra thông tin về số lượng hiện có, nằm trong trường tên là free.

Ở đây dấu bé hơn 5 này là padding số 5 chữ qua bên trái thôi ha.

Ok giờ chúng ta chạy thử chương trình để xem kết quả trả về có đúng như dự kiến không nhé.

Và chương trình đã chạy trả về danh sách các tài sản trong tài khoản test của chung ta. Ở đây Binance cho một vài coin crypto như BTC, ETH, LTC và các coin tiền tệ là USDT và BUSD để chúng ta thử nghiệm ha.

Ok và chúng ta sẽ thử trường hợp API error để xem chương trình chúng ta handle error như thế nào nhé. Thử config API sai bằng cách đổi cái đường dẫn 1 chút ha.

Và thử chạy lại chương trình. Và như dự đoán khi request lỗi chúng ta sẽ nhận về message Error request cùng status và nội dung trong response trả về.

## More implementation and refactor

Ok quay lại BinanceRepo thì chúng ta sẽ tiếp tục implement các request còn lại để xử lý các subdomain GetPrice GetOrders và MakeOrder.

Thì với get_price cũng như get_account thôi. Chúng ta sẽ dùng reqwest client để gởi 1 cái request lên API của Biance sử dụng endpoint trong config là get_avg_price. Ở đây thì chúng ta có thêm cái query là symbol và không cần phải compose_query vì API này API dạng public. Dùng để get cái giá của symbol về thôi. Không cần mã hoá hay làm gì thêm.

Ok và tới bước này thì chúng ta lại phải handle response trả về của client request send.

Thì ở đây phải refactor thôi, vì có 2 chỗ cần handle response rồi.

Thì điểm chung của handle response chính là xử lý response status và chuyển hoá cái response body nếu thành công về dạng struct theo nhu cầu. Ở đây là các struct trong domain mà chúng ta chuẩn bị lúc nãy.

Thì để refactor chỗ này mình sẽ tạo 1 file trong module infrastructure nữa là reqwest_facade.rs trong này là các helper để handle các tác vụ phức tạp cần refactor lại của thư viện. Ở đây là cái crate Reqwest cần xử lý thêm phần handle_response thì mình sẽ bỏ nó vào đây.

Ok. Và function handle_response_json này cũng không có gì đặc biệt. Mình chỉ bê nguyên khối code lúc nãy trong get_account vào đây. Cùng với struct ResponseError về 1 chỗ như vầy thôi.

Sau đó typing lại cho cái function.

Thì ở đây là khai báo sẽ trả về dạng generic type là T và T phải được impl cái trait Deserizalize để chúng ta có thể chuyển hoá nó bằng serde json về struct để trả về. Vì Deserialize nên có thêm cái lifetime ‘a này.

Và Result trả về sẽ handle bằng anyhow::Result như chúng ta dùng cho toàn bộ chương trình.

Rồi và vậy là có thể sử dụng hàm này bên BinanceRepo được rồi.

Quay lại file binance_repo.rs chúng ta tiếp tục implement get_price bằng cách sử dụng hàm ReqwestFacade handle_response_json này để xử lý resp và chuyển hoá về struct là Price trả về thôi.

Ok và cũng không quên refactor code của get_account. Cũng sử dụng ReqwestFacade handle_response_json để sử lý.

Sẵn ở đây mình sẽ thêm luôn feature get_orders cho BinanceRepo. Với get_orders thì như get_account chúng ta phải xử lý compose_query để ký cái request truyền lên, và như get_price chúng ta sẽ thêm trường symbol để lấy các orders của symbol mong muốn.

Rồi cũng như 2 features kia chúng ta sẽ handle response thành dạng Vector BinanceSpotOrder theo cái struct đã chuẩn bị ở domain.

Rồi và giờ chúng ta quay lại main.rs để nối 2 features mới này vào Command.

Đối với get price thì chúng ta println cái price ra thôi.

Đối với GetAllOrders thì chúng ta sẽ in khá nhiều thông tin. Ở đây mình chỉ in ra các thông tin quan trọng là BinanceID và ClientID

Rồi đến Symbol là gì. Rồi Price và cuối cùng là nếu status của order là FILLED - có nghĩa là order này đã tìm được người giao dịch. Thì sẽ có thêm 2 thông tin là Executed quantity và Cumulative Quote Quantity.

Thì để hiểu thêm về các ngôn ngữ miền này thì các bạn có thể tự tìm về trading ha. Ở đây tạm hiểu đơn giản là lệnh được khớp với giá bao nhiêu và số lượng bao nhiêu.

Ok Chúng ta có thể chạy chương trình để thử các feature mới này.

Đầu tiên là get_price truyền vào symbol là BTCUSDT và Ok chương trình trả về giá của BTC. Và thử ETHUSDT. Ok, ổn.

Rồi thử get all orders ha. Ok, ổn đây là các lệnh mà mình đã đặt với symbol BTCUSDT ha. Và thử với ETHUSDT chưa có lệnh nào thì chương trình sẽ trả về Empty orders.

## Make market order

Ok tác vụ cuối cùng chúng ta sẽ xử lý đó là NewOrder - là tạo order mới ha.

Thì với tác vụ này mình thiết kế chương trình đọc lệnh order từ 1 file toml và dùng nó làm thông tin để đặt lệnh. Đây là cách xử lý tạm thời, chương trình chạy thực tế thì nên xử lý băng database và đặt lệnh trên db đó.

Ok và xử lý việc đọc Order từ file ra chúng ta sẽ có một helper function nữa trong BinanceRepo chính là read_order_from_file function này sẽ đọc một cái file toml, parse nó thành struct BinanceSpotOrderRequest mà chúng ta đã chuẩn bị sẵn ở trong domain. Và trả về với dạng anyhow::Result.

Tiếp theo chúng ta sẽ code hàm make_spot_order nhận vào cục BinanceSpotOrderRequest đó và gởi lên Binance API như các tác vụ khác.

Ở đây chúng ta phải xử lý câu query cho Binance API từ 1 cái object dạng BinanceSpotOrderRequest nên mình sẽ code 1 cái facade function nữa là object_to_query.

Thì cái function này cũng đơn giản thôi. Mình có ghi chú ở đây nó sẽ chuyển hoá các field của cái struct truyền vào thành dạng vector (key, value) tuple theo định dạng query của thư viện reqwest. Bằng cách loop qua các keys của object và map nó về tuple. Với cái value thì json nó xuất ra có đính kèm ngoặc kép double quote nên mình sẽ replace cái double quote này đi.

Quay lại BinanceRepo, thì phần implement còn lại cũng giống như các tác vụ kia cũng send request và handle_response_json cho cái response thôi.

Và chúng ta có thể về main.rs để tích hợp tác vụ này vào Command. Thì đơn giản sẽ đọc cái order ra từ 1 cái file và gửi order đi dùng binance repo. Sau đó in kết quả order ra thôi.

Rồi và bây giờ mình có thể dùng cargo run để thử đặt lệnh.

Ah trước tiên thì phải tạo 1 cái file chứa thông tin order đã. order.toml file có dạng sau:

Trong này đơn giản là liệt kê các thông tin ra thôi. Symbol là ETHUSDT ha. Và mình muốn mua vào nên side là BUY, type là MARKET và số lượng quantity là 1.

Có nghĩa là mình muốn mua 1 ETH với USDT với giá thị trường, tức sẽ tốn khoảng 1600 mấy USDT để mua cục ETH này.

Minh se chay lai cargo run account de kiem tra so luong ETH co trong tai khoan ha. La co 100 ETH.

Gio chung ta chay cargo run new-order truyen vao duong dan den file order.toml de ta order ha.

Kiểm tra account cargo run account này. Thì sẽ thấy có thêm 1 ETH so với lúc nãy, giờ là có 101 ETH.

Mua được 1 ETH thì giờ chúng ta thử bán nó đi. Bằng cách edit file order.toml này chuyển lại side là SELL. Sau đó gửi order bằng command NewOrder.

Va chay lai lenh cargo run account de kiem tra. Gio la co 100 ETH.

Co nghia la ETH lúc nãy đã được bán.

Kiểm tra lại Order bang cargo run get all orders ETH thì sẽ có 2 orders như vầy.

Ok kiểm tra lại account thì chúng ta sẽ mất đi cục ETH đó và quay lại có ETH là 100 như lúc đầu.

Số tiền USDT có trong tài khoản cũng thay đổi do giao dịch mua bán. Thì nếu giá lên trong lúc chúng ta Mua và bán thì lời giá xuống thì lỗ. Và ngược lại thôi.

# Conclusion

Ok, và vậy là mình đã demo được các tác vụ xử lý các thao tác trên sàn giao dịch Binance sử dụng API và lập trình sử dụng ngôn ngữ Rust.

Hy vọng video hữu ích cho các bạn đang tìm hiểu về lập trình giao dịch Crypto hay Chứng khoán hay các hệ thống tài chính như Momo, VNPay cũng có các tác vụ tương tự.

Về ngôn ngữ Rust thì mình đi thêm qua được các tính năng phức tạp hơn so với video trước như xử lý refactor cho thư viện. Hay xử lý áp dụng Domain Driven Design vào cách cấu trúc lên chương trình. Mặc dù không sâu lắm đây chỉ mới là DDD ở dạng chập chững baby step thôi nhưng chắc cũng cảm được phần nào.

Ý tưởng cho video tiếp theo có thể sẽ tích hợp các Indicator - là các chỉ số thị trường - vào trong chương trình. Và cách dùng chúng để tạo nên 1 chiến lược đặt lệnh. Chắc sẽ là 1 video phức tạp hơn video này nhiều.

Cảm ơn các bạn đã theo dõi tới đây. Xin chào và hẹn gặp lại. Chop out!

