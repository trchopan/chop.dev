+++
title = "Rust - 01 - Hello World"
author = ["Chop Tr (chop.ink)"]
description = "Hello world"
tags = ["learning", "rust", "hello", "world"]
draft = true
+++

## Intro {#intro}

Chào các bạn trở lại với lập trình Rust cùng Chop.

Video về ngôn ngữ lập trình Rust và các công nghệ lập trình.

Nếu các bạn thấy video hay và bổ ích hãy cho 1 like và sub ha.


## The book {#the-book}

Hôm nay chúng ta sẽ bắt đầu bằng việc tìm hiểu môi trường code Rust.

Các phương tiện để học và các đường dẫn thông tin bổ ích.

Đầu tiên học Rust thì phải xem cuốn sách Rust Programing Language Book.

Cuốn này miễn phí và ai cũng có thể vào đọc nó qua đường dẫn này ha.

<https://doc.rust-lang.org/book/>

Quyển này là official của core team lập trình Rust đc viết bởi Steve Klabnik và Carol Nichols.

Hy vọng mình đọc đúng tên 2 anh chị này.

Nhân đây cũng xin cảm ơn 2 anh chị đã viết quyển sách tuyệt vời như vậy.

Và nếu các bạn xem review về ngôn ngữ Rust ở nhg trang web hay video khác

thì chắc cũng đã biết Rust nổi tiến và được yêu thích như hiện tại một phần cũng là nhờ quyển sách này.

Các video của mình sẽ hầu hết dựa trên nội dung của quyển sách này thôi.

Nếu các bạn cần có thể đọc thêm để hiểu sâu hơn.

Video của mình này sẽ đóng vai trò diễn đạt trực quan bên cạnh nhg thông tin của sách.


## Installation {#installation}

Oki. Từ đây mình sẽ gọi quyển sách này là Rust Book ha.

Và bước đầu tiên là cài đặt Rust ha.

Trong Rust book, thì các bạn có thể vào phần Installation.

Sẽ có hướng dẫn chi tiết cụ thể để cài đặt.

Đối với Linux hay MacOS. Đơn giản chỉ cần mở Terminal ra và dán dòng lệnh này vô thôi.

```bash
$ curl --proto '=https' --tlsv1.3 https://sh.rustup.rs -sSf | sh
```

Lệnh này sẽ cài bảng stable của Rust lên trên máy bạn.

Tạo cái thư mục .cargo để chứa các file repository source code cũng như cache các file build

của Rust toolchain đồ.

Các bạn trên MacOS sẽ cần linker nữa là công cụ để nối các code compiled vào thành 1 file.

Hầu hết các bạn đã có sẵn linker nhg mà nếu các bạn gặp lỗi về linker thì sẽ phải cài đặt.

Các bạn sẽ phải cài qua 1 cái C compliler.

Trên máy MacOS, các bạn chạy lệnh sau:

```bash
$ xcode-select --install
```

Trên Linux thì thường là các package gcc hay Clang tuỳ vào distribution.

Ví dụ như trên Ubuntu thì là build-essential.


### Trên Windows {#trên-windows}

Trên Windows thì các bạn có thể download 1 file exe để chạy việc cài đặt này gọn gàng luôn.

Nhg mà như Rust book đề cập bạn cũng có thể phải cài thêm Visual Studio 2022 nếu chưa cài.


### Check {#check}

Oki. Cài xong Rust rồi thì các bạn có thể sử dụng lệnh sau để kiểm tra việc cài đặt thành công.

```bash
$ rustc --version
```

nó sẽ hiện ra version của Rust đc cài như sau.

Của mình là: Rust 1.59.0

Oki ngon cơm ha giờ là tới phần thú vị hơn ha.


### Language server {#language-server}

Để lập trình hiệu quả và dễ dàng chúng ta còn cần cài thêm Language Server nữa.

Nó sẽ cho chúng ta nhg công cụ hỗ trợ như Code completion - là Tự động hoàn thành code.

Definition - là các định nghĩa hàm.

Refactoring - là khi các bạn cần tái cấu trúc chương trình, ở đây là khi các bạn cần đặt tên lại biến hay dời file dời biến sang chỗ khác.

Ở đây mình sẽ demo thử các công cụng và extension trên VSCode.

Đầu tiên là bật VSCode lên. Rồi vào tab Extensions.

Sau đó search rust trên Marketplace.

2 cái extension đầu tiên sẽ là Rust và rust-analyzer.

Cái đầu tiên là cái công cụ đã bị deprecated, là sẽ ko còn đc support nữa.

Nên các bạn sẽ cài đặt cái thứ 2 này nhe là rust-analyzer.

Ok và nhấn nút cài đặt và chờ thôi.

VSCode là tôn phổ biến nhất hiện tại đối với các bạn lập trình viên nên mình demo trên này.

Các video lần sau mình sẽ sử dụng công cụ thân thuộc với mình khi lập trình là Emacs hoặc Vim chứ ko sử dụng VSCode.

Nhg mà các bước hay chức năng sẽ y hệt thôi ha. Các bạn có thể đối chiếu tương đương với môi trường VSCode.


## Hello World {#hello-world}

Ok. Tiếp theo thì chúng ta code thôi. Viết 1 chương trình hello world ha.

Chúng ta sẽ tạo 1 cái thư mục mới. Tên là hello-world.

Rồi cd vào nó. Dùng vscode mở nó ra.

Mình sẽ tạo 1 cái file tên là main.rs

Nếu các bạn thấy cái pop-up kêu install language server cho Rust thì cứ install ha.

Có thể các bạn sẽ gặp lỗi "rust-analyzer failed to discover workspace"

là tại vì chúng ta đang xử lý trên 1 file main.rs thôi chứ đang ko sử dụng cargo để quản lý workspace.

Ok giờ thì mình sẽ code cái chương trình đầu tiên dùng Rust ha.

Đầu tiên là khai báo 1 cái hàm - function. Viết tắt là fn. Và tên của nó là main.

Hàm này là hàm sẽ đc chạy đầu tiên khi chương trình bắt đầu chạy.

Chúng ta sẽ print ra 1 dòng chữ - hay còn gọi là String hay Text.

Dùng println! làm công cụ để in ra, truyền vào String "Hello world".

Ở đây println! là một cái macro chứ ko phải function như ngôn ngữ khác.

Chúng ta sẽ tìm hiểu về macro ở video khác.

Kết thúc là 1 cái chấm phẩy, semi-colon.

Rồi, lưu file lại.

Và vào terminal rồi gõ

```bash
$ rustc main.rs
```

Lệnh này sẽ compile code trên.

Ok và main.rs đã đc compiled.

chúng ta sẽ có 1 cái file main mới kế bên.

Đây là 1 file dạng executable - có nghĩa là chạy đc.

Chạy file này sẽ in ra "Hello World" như code lúc nãy.

Horray, thành công rồi.

Ui cảm giác chương trình Rust đầu tiên chạy đc. Tuyệt vời!


## Cargo {#cargo}

Hehe. Nhg đó là baby step thôi các bạn.

Quãn đường còn dài và chông gai lắm chứ ko phải chỉ 3 dòng lệnh vầy đâu.

Ok. Chúng ta đã thành công xử lý chương trình nhỏ tí tẹo trong 1 cái file main.rs đó.

Nhg mà đời ko như mơ đâu.

Chương trình thật chắc chắn phải làm việc với hàng chục file.

Xử lý hàng trăm tác vụ.

Chúng ta cần 1 công cụ để quản lý dự án ha.

1 package manager.

Giới thiệu "cargo".

Chương trình này đc cài đặt chung với bộ công cụ chúng ta cài lúc nãy.

Các bạn có thể kiểm tra bằng lệnh

```bash
$ cargo --version
```

Trên máy của mình là version 1.59.0

Ok. Chúng ta sẽ dùng cargo để tạo package hay tạm dịch là gói dự án ha.

Chạy lệnh

```bash
$ cargo new hello_world
```

Lưu ý ở đây phải là dấu gạch dưới ha.

Rust ko cho sử dụng dấu gạch ngang trong tên.

Oki. Cargo đã tạo ra package cho chúng ta với một vài file để setup.

Bắt đầu từ Cargo.toml.

Đây là 1 file configuration, nó sẽ là chỗ để chúng ta khai báo các thông tin liên quan đến package này.

Như tên - hello_world, version, v.v

Dưới này là để khai bao dependancies.

Hiện chúng ta ko có dependencies nào nhg các bạn có thể tưởng tượng trong dự án thực tế chúng ta sẽ ko tự viết các dòng code.

Mà sẽ sử dụng nhiều code các lập trình viên khác đã viết và chia sẽ open source ở đây.

File này nếu các bạn là lập trình viên Frontend làm Typescript Javasript như mình thì đây giống như file package.json ha.

Chúng ta cũng có một số file khác như gitignore để tạo 1 repository quản lý source code trên git.

Ok. Và chúng ta cũng có 1 main.rs file nằm trong thư mục src.

File này cũng là file "hello world" như lúc nãy.

Rồi giờ sẽ thử build cái cargo project này ha.

Mình sẽ chạy cargo run ở trong thư mục này.

Và như các bạn thấy Hello World cũng đc in ra như chương trình kia cùng với một vài thông compiling tin khác.

Nó cũng tạo ra 1 cái file Cargo.lock.

File này đóng neo các cái dependancy cho cái package này. Tương tự package-lock.json.

Oki. Và chúng ta đã hoàn thành Chapter đầu tiên của quyển Rust Book.

Phew. Ko quá khó đúng hok.

Nếu các bạn thấy video này bổ ích hãy cho mình 1 like động viên ha.

Hẹn gặp lại trong các video tiếp theo.

Chop Out!

Bye.