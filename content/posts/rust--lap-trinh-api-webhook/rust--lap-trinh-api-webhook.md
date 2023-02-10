+++
title = "Rust: Lập trình API webhook"
author = ["Chop Tr (chop.dev)"]
description = "Rust là ngôn ngữ yêu thích của mình. Vừa rồi thì có phát triển 1 cái Webhook endpoint cho cá nhân sử dụng. Tích hợp Plex và TelegramAPI để gửi tin nhắn thông báo. Video sử dụng một số công cụ thường sử dụng trong lập trình như: Postman, Ngrok."
date = 2023-02-01T00:00:00+07:00
tags = ["rust", "axum", "framework", "api", "programming"]
draft = false
cover = "/posts/rust--lap-trinh-api-webhook/rust--lap-trinh-api-webhook-2.jpg"
+++

# Video

[https://www.youtube.com/watch?v=25sW0Pel_xQ](https://www.youtube.com/watch?v%3D25sW0Pel_xQ)

# Intro

Hi. Xin chào các bạn. Chop trở lại với 1 video mới. Video lần này là về lập trình Rust.

Rust là ngôn ngữ ưa thích nhất của mình. Thì nếu bạn nào lập trình nhiều để ý mấy cái survey hay ranking đều thấy Rust đứng top trong danh sách các ngôn ngữ được yêu thích nhất.

Cá nhân mình code qua mấy ngôn ngữ như Python, Typescript, Golang, Dart, Haskell và hiện là đang code Rust. Thì trải nghiệm 1 hồi cảm thấy Rust là ngôn ngữ ưa thích nhất trong các ngôn ngữ đã trải nghiệm.

Chắc không cần đi qua mấy cái so sánh vì có khá nhiều tài liệu trên mạng vì sao Rust được ưa thích rồi. Chém sơ chút thôi. Mình thì thích cách Rust handle Errors bằng mấy cái Container type như Result, Option. Đây là các kiểu Monad như trong functional programing, là cách Rust lồng functional programing vào trong code. Và có support mấy hàm map, reduce, flatten, and_then cũng rất quen thuộc và trực quan để sử dụng.

Và cách Rust phát hiện ra lỗi cấu trúc trước cả khi compile chương trình và chỉ ra chính xác chỗ nào nhờ vào bộ rust-analyzer cực mạnh. Và Borrow Checker đảm bảo việc sử dụng memory an toàn và hiệu quả.

# Mục đích video

Ok promote Rust một hồi vậy chắc đủ rồi, quay lại mục đích chính của Video thì lần này mình code live 1 chương trình Rust xài cá nhân thôi.

Sự là nhà có cái server media xài Plex để stream video. Với con server này thì đi đâu mình cũng có kho phim kế bên mà không cần bị bó buộc bởi các dịch vụ Streaming như Netflix hay Apple. Sau khi bị tụi nó thu tiền 5 7 USD / tháng đau quá mà không có mấy cái phim mình ưa thích. Thì mình quyết định xắn tay áo lên tự xử con server này luôn, chạy trên con Raspberry Pi ở nhà tốn điện chút nhưng chắc không quá 10k / tháng.

![](/posts/rust--lap-trinh-api-webhook/rust--lap-trinh-api-webhook-0.jpg)

[https://www.rapidtables.com/calc/electric/electricity-calculator.html](https://www.rapidtables.com/calc/electric/electricity-calculator.html)

Ở đây estimate là con raspberry pi chạy 5W xài 24/7 và giá điện là 2k / kWh nha.

Rồi thì cuối tuần rồi có vọc qua cái webhook của Plex nên thấy thú vị làm 1 cái server endpoints để nối vào tích hợp với nó sẵn practise Rust luôn.

Thì giải thích sơ Webhook, nó là 1 cái cách để các service có thể extends - mở rộng - thêm các chức năng bằng cách sử dụng những đầu nối kiểu callback được quản lý bởi bên thứ 3 - bên thứ 3 ở đây là các developer bên ngoài như mình nè.

Các webhook này sẽ được kích hoạt khi có sự kiện xảy ra với chương trình chính - chương trình chính ở đây là con server Plex. Nó cho phép chương trình chính callback vào 1 cái endpoint, cùng với thông tin mô tả sự kiện trong cục request.

Và mình sẽ viết cái Endpoint này để handle cái sự kiện Plex truyền tới. Các sự kiện ở đây là media.play, media.stop, media.resume v.v để mô tả các trạng thái video đang chạy, đang dừng.

Mình sẽ bắt sự kiện media.play và chuyển thông tin này lên Telegram để thông báo lên đó là đang xem phim gì.

Thì qua video này chắc sẽ demo được các tác vụ sau:

- Thao tác khảo sát nghiên cứu webhook call. Xem gói data nó gọi là gì.
- Xây dựng Server để handle cái webhook call đó và xử lý dữ liệu data.
- Thao tác với Telegram bot. Xử lý các API call để gửi message bằng bot.

# Khảo sát nghiên cứu webhook dùng Postman

Thì bước đầu là xem xét cái Plex webhook đó ha. Với webhook nào cũng vậy đầu tiên là nghiên cứu cái data đính kèm với cái callback là gì. Và công cụ để mình nghiên cứu nhanh cho tác vụ này là Postman. 

Postman là một công cụ hỗ trợ phát triển API và server khá là powerful. Features đồ đầy đủ lắm, từ lưu các lệnh gọi, lưu các biến môi trường, tới xuất ra code để gọi, v.v tha hồ để config mà xài.

Ở đây mình sẽ sử dụng feature Mock Servers để xem con Plex nó gọi callback về với data là gì ha.

Xài Mock Server thì đơn giản thôi, vào Mock Servers rồi nhấn dấu cộng [Create Mock Server]. Form này thì chọn Create a new Collection để tạo 1 collection cho Mock server rỗng. Ở đây thì chỉ cần điền cái response này vô là có thể tạo Server. Next, Rồi cho nó 1 cái tên Ví dụ là Demo Plex ha. Xong Create Mock Server là xong. Chúng ta đã có 1 cái endpoint để thử nghiệm.

Ở góc trên bên phải này sẽ có nút Copy URL, nhấn vào đây các bạn sẽ có cái URL để có thể đưa cho Plex để gắn vào Webhook. Ok trong Plex thì nhấn vào Setting vào Webhooks rồi Add Webhook, xong paste cái đừng dẫn copy của Postman vào đây rồi save thôi.

Xong giờ mình sẽ thử nghiệm play pause các video xem event nó gửi về ha. Vô lại kho phim của mình nhấn nút play. Rồi quay lại Postman nhấn Refresh Logs các bạn sẽ thấy có những request gọi vào cái Endpoints mà mình vừa mới paste vào Webhook của Plex.

Mở ra xem thêm thì sẽ có các thông tin của body data cũng như header mà Plex Webhook nó gọi vào. Từ đây mình có thể lên kế hoạch phát triển cái Server endpoint rồi.

Ở đây xem kĩ chút thì cái Content-Type gọi vào là multipart/form-data ở đây hơi khác bình thường chút là Plex sử dụng multipart, thường thì các webhook khác mình hay thao tác sử dụng application/json. Nhưng không sao lưu ý ở đây để tí sử lý thôi.

OK trong cái Body Data thì có cái payload event chứa nội dung của cái event vừa mới được Plex Webhook đính kèm. Trong này chứa khá là nhiều thông tin. Mình sẽ copy nó qua một công cụ nữa để nghiên cứu kỹ hơn là quicktype.io

Ở đây thì dễ thấy hơn cục data ha. Xem sở thì nó có cái key "event" sẽ chứa loại event là gì. Trong này là một cái string, có mấy loại như media.stop media.play media.resume ha.

Ở dưới thì là Account, Server, Player, Metadata, v.v là các thông tin liên quan đến cái event mới được gửi.

Bên phải là đoạn typing các kiểu dữ liệu thành Rust được cái app quicktype.io này xử lý giùm mình.

Với app này thì nó sẽ đoán các kiểu dữ liệu dựa trên cục data JSON mà mình truyền vào ở đây.

Với các code được generate ra này thì lát nữa mình có thể copy vào code Rust thôi mà không cần gõ tay lại.

# Dựng server để nhận callback dùng Axum

Tiếp theo chúng ta sẽ bắt đầu code con server để nhận cái callback trên ha.

Ok thì mình sẽ init 1 cái project tên là mini-hook. Xong rồi, trong này sẽ bắt đầu thêm những thư viện hay còn gọi là crates, là các dependencies của chương trình. Mình sẽ đi qua từng cái giải thích chức năng của từng crate khi dùng tới nó.

Với hệ sinh thái Rust thì chúng ta có các lựa chọn: Actix, Axum, Warp, Rocket, v.v Mình thì mới xài qua 2 cái là Actix và Axum.

Actix là framework khá nổi tiếng, có khi nổi tiếng nhất trong các frameworks luôn. Mình dùng framework này cho production vì yeh nó khá nổi tiếng, cộng đồng nhiều thì sẽ có nhiều người biết, nhiều người có thể giúp đỡ mình khi bị bí chỗ nào đó.

Axum thì được core team của Tokio là một crate nổi tiếng khác để xử lý các tác vụ asynchronous. Axum được xây trên nền tảng của tokio và dễ dàng tích hợp các crates khác trong hệ sinh thái này. Trong video này thì sẽ demo bằng Axum nhe. API của axum thấy friendly hơn nhiều so với Actix. Nếu code chơi cho các project hobby thì xài Axum cho nó thoải mái.

Chúng ta sẽ bắt đầu bằng cargo add 2 cái dependencies là axum và tokio. Axum thì thêm features multipart để handle cái Content-Type là multipart/form-data như chúng ta khảo sát bằng Postman lúc nãy. Tokio thì mình add full features luôn.

Ok thì đầu tiên vào trang docs của Axum, chúng ta sẽ copy đoạn code Hello World của nó phát triển dựa trên đó ha.

Copy rồi paste vào, chỉnh chỗ này 1 chút 0.0.0.0 thành 127.0.0.1, là sẽ bind ở localhost thay vì là public cho anyhost.

Xong chạy cargo run chúng ta sẽ có 1 con server serve hello world cho localhost. Thử curl vào sẽ thấy trả về chuỗi Text "Hello World" ha.

Ok good. Tiếp theo chúng ta sẽ thêm 1 chút logging để xem tình hình con server chạy, sau này debug dễ hơn.

Thêm 2 cái crates: env_logger và tracing ha.

Để tích hợp 2 crates trên thì trong main.rs chúng ta sẽ thêm 2 dòng sau:

```rust
    env_logger::init_from_env(Env::default().default_filter_or("debug"));
    tracing::info!("listening on {}", addr);
```

Rồi import mấy cái crates đó vào thôi.

Ở đây chúng ta chỉnh default logger là ở chế độ debug. Nếu muốn chuyển chế độ log thì sẽ dùng biến môi trường là RUST_LOG thành info cho production để giảm lượng log lại.

Dòng thứ 2 là tracing::info! là 1 cái macro để in ra thông tin chúng ta đang bind addr ở địa chỉ nào. Ở đây chúng ta chưa có biến addr. Sẽ xử lý nó bằng 1 cái crate khác, là clap.

Cargo add clap vào, và mình sẽ sử dụng features là derives để config clap ha.

Clap là công cụ để parse command line. Là khi chúng ta muốn truyền vào các giá trị khác nhau để setup chương trình khi bắt đầu chạy. Sử dụng các cờ - flags trên command line.

Ở đây mình sẽ có 3 arguments là addr như ở trên và chat_id và bot_token.

chat_id và bot_token là 2 argument sẽ được dùng để setup cho Telegram service, dùng để gởi mesage lên Telegram, lát nữa chúng ta sẽ viết.

Thì cách khai báo kiểu derive cho clap đơn giản vầy thôi. Các bạn có thể vào docs của clap để tham khảo kỹ hơn.

Với khai báo này thì chúng ta có thể sử dụng biến addr đển bind địa chỉ cho chương trình bằng cách truyền vào từ command line rồi.

Trong code chúng ta sẽ parse các argument ra và parse biến addr ra như sau. Và đổi cái string hardcode này thành addr.

Rồi giờ quay lại command line chạy

```rust
cargo run – –addr 127.0.0.1:5500 –chat-id 123 –bot-token abc
```

là chúng ta sẽ bind con server ở cổng 5500 thay vì cổng 3000 như lúc nãy.

# Telegram API

Và tiếp theo thì chúng ta sẽ xử lý tiếp tới Telegram service. Ở đây mình cấu trúc cái app hơi hướng theo kiểu MVC chút. Xài service - model và controller ha, với thằng Controller thì mình sẽ gọi nó là Application.

Ok, thì quay lại cái Telegram Service là để xử lý các tác vụ liên quan đến Telegram API. Gói lại cho bên ngoài dễ xài.

Với Telegram API thì các bạn có thể tham khảo link sau.

[https://core.telegram.org/bots/api#sendmessage](https://core.telegram.org/bots/api%23sendmessage)

Mình chỉ sử dụng 2 API cho demo này là getUpdates và sendmessage.

Để về lấy token của bod thì các bạn có thể chat với bác BotFather này link [https://t.me/botfather](https://t.me/botfather)

Đây là 1 con chat bot để hỗ trợ việc tạo và quản lý bot.

Các bạn có thể dùng lệnh /help bác sẽ list ra các lệnh có thể tương tác với bác.

Trong này sẽ tạo bot bằng lệnh /newbot Xong chọn tên. DemoPlex ha.

Xong đặt 1 cái id cho nó ví dụ là demo_plex_bot.

Ok vậy là xong, bác BotFather đã tạo cho chúng ta 1 con bot và cho 1 cái token để dùng với TelegramAPI.

![](/posts/rust--lap-trinh-api-webhook/rust--lap-trinh-api-webhook-1.jpg)

Rồi lưu ý cái token này ha. Chúng ta sẽ sử dụng nó làm token để thao tác với TelegamAPI

Đầu tiên là lấy cái phòng chat với bot trước. Chúng ta sẽ tìm đến con bot theo địa chỉ t.me/demo_plex_bot này nè. Rồi Start chat với nó. Chat với bot vài dòng xong curl vào TelegramAPI để lấy cái chat_id gần nhất chính là cái chat_id giữa con bot và mình.

Sẽ dùng Postman để gọi lên TelegramAPI ha. 

Ở đây thì mình có sẵn lệnh GET đến cái URL là api.telegram.org/bot{{bot_token}}/getUpdates

Send cái request này thì sẽ có thông tin của cái chat vừa rồi. Trong này có "from", là chứa thông tin của người gởi. Còn "chat" là thông tin của cái chat room giữa mình và con bot.

Như các bạn cũng thấy cái mesage vừa gởi là "hello my bot".

Rồi thì mình sẽ lấy cái chat_id ở đây. Là một con số id thôi ha.

Giờ mình sẽ sử dụng bot_token và chat_id để gởi 1 cái tin nhắn demo ha.

Để gởi 1 cái tin nhắn thì sẽ sử dụng API sendMessage . Method gởi request cho API này là POST. URL của nó cũng giống như getUpdates, chúng ta sẽ chỉ đổi cái endpoint thành sendMessage thôi.

Và cái body của POST request này gồm cái chat_id mà chúng ta muốn gởi message tới và nội dung tin nhắn trong cái key "text" này. Mình sẽ thử gởi "Hello Chop". Rồi Send thôi. Rồi ting ting bot gởi tin nhắn thành công ở đây.

OK, thao tác với TelegramAPI thì sẽ như vậy. Chúng ta sẽ xử lý 1 cái service để thực hiện việc gởi POST Request lên để nhờ con bot gởi cái mesage lên chat room.

Về lại Rust Project, mình sẽ tạo một thư mục mới là services trong này sẽ có file mod.rs là module entry, module nào cũng có ha.

Trong này sẽ public ra 1 cái module là telegram_bot

Rồi tạo 1 cái file telegram_bot.rs trong cùng thư mục luôn. Trong này sẽ là nội code của cái service TelegramBot ha.

Mà trước khi code service TelegramBot thì chúng ta nên nối cái module service này vào cái project này để Rust có thể kết nối nó với chương trình chính để sử dụng các cái feature của rust-analyzer.

Kết nối bằng cách gắn nó vào file lib.rs, Thì chúng ta sẽ tạo file lib.rs này rồi public cái module tên là services ra.

Ok vậy là Rust đã có thể kết nối được và chúng ta bắt đầu code cái TelegramBotService. Quay lại file telegram_bot.rs

Đầu tiên mình sẽ khai báo một cái public struct tên là TelegramBotService. Struct này sẽ được dùng để khởi tạo cái object service mà mình sẽ dùng. Trong này sẽ chứa các thông tin để service có thể hoạt động, bao gồm chat_id dạng String nè, token dạng String, endpoint dạng String, và 1 cái reqwest client.

Thì reqwest client này (hok phải viết sai chính tả đâu nha, chữ w thiệt) là một crates để giúp chúng ta xử lý việc gởi HTTP request lên các API endpoints. Chúng ta sẽ dùng cargo add crate này và sẽ thêm features json.

OK, đầu tiên mình sẽ tạo 1 public function new để khởi tạo service object nay cho app. Trong này sẽ truyền vào các thông tin của service như trên và khởi tạo client reqwest ở đây luôn. Setting của client chúng ta sẽ config ở đây, là set cái timeout là 10 giây thôi. Ngoài timeout thì nếu các bạn call API mà cần HEADER chứa API key thì cũng có thể set ở đây luôn.

Bot_token của TelegramAPI thì ko nằm ở header mà nằm ở path nên mình sẽ xử lý kiểu khác.

Đó là tạo thêm 1 cái helper function make_url này để xử lý việc nối bot_token vào endpoint.

Ok xong chúng ta sẽ tới function chính đó là sendMessage. Trong này nhận vào 1 cái msg dạng String và trả về Result, empty nếu thành công còn nếu có lỗi thì trả về dạng String.

Url thì chúng ta sẽ dùng hàm helper make_url lúc nãy để tạo.

Map chính là cái object để chúng ta gởi trong body của POST request. Bao gồm "chat_id" và nội dung "text" theo cấu trúc TelegramAPI mà chúng ta cũng đã thử lúc nãy.

Ok thực hiện POST request ở dòng này, self.client.post thôi. Dùng cái client mà lúc nãy chúng ta config. Sau đó bọc lại trong một cái match expression để xử lý 2 trường hợp. Nếu Error thì log tracing::error! cái lỗi ra để chúng ta debug, và trả về Cục object Err bọc cái String cannot request telegram trả về làm kết quả Result.

Trường hợp request thành công, match với Ok thì cũng vậy. Chúng ta log ra với level tracing::debug và trả về kết quả unit type mở rồi đóng ngoặc thôi.

Quay lại file main.rs thì chúng ta sẽ dùng function new để khởi tạo TelegrameBotService dùng 2 thông tin truyền vào command line argument là chat_id và bot_token. Đặt tên nó là telegram_svc (viết tắt của service).

Thì để đính kèm service này với app của chúng ta thì sẽ dùng hàm with_state này và truyền vào object telegram_svc thôi. Vậy là xong, chút nữa chúng ta sẽ dùng cấu trúc Extractor của axum để trích xuất service này ra.

# PlexWebhookEvent struct

Tiếp theo chúng ta sẽ xử lý về models. Setup module này cũng như setup service thôi, chúng ta sẽ tạo file mod.rs trong thư mục models rồi gắn nó vào lib.rs.

Ok thì để xử lý cục dữ liệu mà Plex gởi về chúng ta sẽ chuẩn bị sẵn một struct cái struct Copy từ quicktype.io lúc nãy. Paste vào đây là xong. Ah các bạn để ý chúng ta sẽ chọn Option là Make All Properties Optional vì từng event sẽ có các properties khác nhau và cũng không phải thông tin nào cũng có.

Rồi tới đây thì chúng ta sẽ cần 1 crate nữa là serde. Lại dùng cargo add serde để thêm vào thôi, thêm feature là derive nữa ha. Và sẵn đây mình sẽ thêm crate serde_json luôn, sắp tới mình sẽ sử dụng để parse cái data của Plex ra.

# Application layer - Handler

Ok và file này đã hoàn chỉnh. Chúng ta sẽ tiếp tục qua module applications là cái layer cuối cùng. Trong này nó sẽ là nơi nối với framework để xử lý request gửi đến con server này.

Trong module application này sẽ là danh sách các cái Handler để xử lý cho từng request. Cấu trúc Handler của axum đơn giản là 1 cái async function. Nhận vào các extractors, ở đây là telegram_svc extract từ trong Application State lúc nãy mình đính vào trong main, tiếp theo là multipart cũng là 1 cái extractor cho các nội dung truyền vào hay đi kèm với request. Kiểu trả về là kiểu Result với kết quả Ok thì impl trait IntoResponse còn kết quả Error thì là 1 cái StatusCode. Mình sẽ gọi function này là plex_webhook.

Bên trong đầu tiên sẽ xử lý parsing cái payload gởi vào ha. Ở đây mình iterate qua cái object multipart này là một cái extractor, được framework axum truyền vào từ cái request. Với multipart form data nay thì sẽ có nhiều field và khi tìm được field có cấu trúc như PlexWebhookEvent thì chúng ta sẽ break while loop.

Rồi dùng expression let else của Rust này để xử lý tiếp cái payload. Đây cũng là điểm mà mình thích của Rust, ngôn ngữ này có các expression khá trực quan và dễ sử dụng. Ở đây có nghĩa là lấy kết quả Some của Payload và gán vào biến event, còn nếu không (payload là None) thì sẽ trả về Error với StatusCode là BadRequest.

Tiếp theo chúng ta xử lý tiếp tới event. Trích xuất cái event_name ra và chỉ xử lý event "media.play" chứ không xử lý các event khác.

Rồi thì nếu event là "media.play", chúng ta sẽ trích xuất metadata của event ra. Rồi dùng macro format! này của Rust để tạo nên mesage dùng để gởi cho Telegram.

Message gởi lên sẽ có cấu trúc Playing: cùng với title và year của phim đang được play. Rồi type là kiểu phim là gì và cuối cùng là mô tả ngắn của phim - Summary. Tất cả đều được lấy ra trong metadata, dùng hàm unwrap_or.

Cuối cùng chúng ta gửi message đi dùng telegram_svc và hàm sendMessage. Kết quả trả về mình sẽ tạm thời chưa xử lý và để là đấu _ để ký hiệu ở đây.

Cuối cùng là return về kết quả Ok với StatusCode Ok.

Ok vậy là xong Application Handler. Chúng ta nối nó vào main app là xong.

Để route cho endpoint này là /plex và kiểu request là post rồi truyền vào cái handler vừa mới tạo plex_webhook.

# Serve and test with ngrok

Ok vậy là xong, chúng ta có thể chạy cargo run để serve cái server để có cái endpoint cho Plex gởi webhook callback vào.

Trước khi chạy cargo run thì để test chúng ta có 1 công cụ nữa là ngrok. Nó là 1 công cụ để reverse proxy về localhost thường là để phát triển hay test webhook như trường hợp chúng ta đang làm đây.

Để cài đặt ngrok thì các bạn làm theo link này nhe. Tuỳ đang sử dụng MacOS, Windows hay Linux.

[https://ngrok.com/download](https://ngrok.com/download)

Có ngrok rồi thì chúng ta có thể start 1 cái reverse proxy với lệnh sau

```
ngrok http 5500
```

Thì sau khi ngrok thiết lập session sẽ cho chúng ta 1 cái domain để trỏ về localhost trên cổng 5500 này luôn.

Rồi quay lại server chúng ta sẽ chạy cargo run để serve đúng cổng 5500 này. Truyền addr, chat_id, bot_token chính xác và start.

Sau đó thử lên Plex nhấn play 1 phim bất kì. Nếu mọi việc đều ổn chúng ta sẽ nhận được 1 message thông tin về phim đang chạy.

Ok rồi message đã được gởi về Telegam thành công với nội dung title phim và nội dung phim nè.

# Conclusion

Ngon lành, vậy là chúng ta đã code thành công 1 cái server endpoint để xử lý Webhook của Plex sử dụng Rust Framework Axum.

Qua video này thì mình demo được 1 chút về ngôn ngữ Rust, ôn lại mấy cái kiến thức về lập trình.

Mấy cái tool trong video này chắc cũng sẽ hữu ích cho bất kỳ bạn lập trình viên nào cần xử lý các tác vụ liên quan đến API hay webhook server.

Tiếp theo chắc mình sẽ làm video về Rust tích hợp với Database để thành cái application hoàn chỉnh hơn. Hiện cũng đã có ý tưởng sơ sơ.

Cảm ơn các bạn đã theo dõi tới đây. Xin chào và hẹn gặp lại. Chop out.

