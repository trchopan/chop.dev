+++
title = "Rust - 01 - Hello World"
author = ["Chop Tr (chop.ink)"]
description = "Giới thiệu chương trình học Rust. Mục tiêu và Cấu trúc bài học."
tags = ["learning", "rust", "hello", "world"]
draft = true
+++

## Giới thiệu {#giới-thiệu}

Xin chào mọi người, Chop trở lại với một video mới. Lần này là 1 chuỗi video về lập trình.

Sau một thời gian học và tiềm hiểu về lập trình Rust mình quyết định thực hiện chuỗi video này. Một phần là mình tự tạo động lực để tiềm hiểu sâu hơn và một phần để chia sẽ nhg kiến thức mà mình học đc.

Hy vọng Chuỗi video này chắc sẽ hữu ích cho các bạn thích xem video để học thay vì đọc sách hoặc tài liệu (giống mình).


## Ngôn ngữ Rust {#ngôn-ngữ-rust}

Rust: Ngôn ngữ lập trình biên dịch có tính Memory safe (tạm dịch là bộ nhớ an toàn). Cho phép lập trình cấp cao (high-level language), giữ tính đơn giản, nhưng có hiệu xuất tốc độ của ngôn ngữ lập trình cấp thấp (low-level).

Lúc đầu Rust đc tạo ra để xây dựng hệ thống nền (system code) như Game Engine, Database hay Hệ điều hành (Operating System). Nhg sau dần đc sử dụng rộng rải hơn, mạnh lên sau khi là ngôn ngữ phổ biến để xây app bằng Web Assembly.

Feature chính của Rust chính là Memory safe (bộ nhớ an toàn). Thường thì các ngôn ngữ cấp cao (high-level programming language) như Go, Python có hệ thống quản lý bộ nhớ tự động bằng Garbage Collection. Và các ngôn ngữ cấp thấp (low-level programming language) quản lý bộ nhớ thủ công bằng các hàm allocate (cấp phát) hay giải phóng (free) bộ nhớ như C hay C++. Rust nằm ngay giữa, nó hok có Garbage Collector, cũng ko có hàm allocate hay free bộ nhớ. Mà nó sử dụng khái niệm mới là `Ownership` và `Borrowing` để quản lý các biến và con trỏ trong lúc viết chương trình.

Công ty tài trợ cho Rust là Mozzila, công ty tạo ra trình duyệt web Firefox.


## Cấu trúc {#cấu-trúc}

Cấu trúc của các video phần lớn sẽ dựa trên cuốn sách `The Rust Programming Language` viết bởi Steve Klabnik and Carol Nichols. Cuốn này có phiên bản mở miễn phí online trên trang web offical `doc.rust-lang.org` . Các bạn có thể nhấn vào đường dẫn trong description của video để xem thêm.

Ngoài các thông tin và kiến thức trong cuốn sách trên thì mình cũng sẽ thực hiện những video xoay quanh các khái niệm về lập trình khác không chỉ trong Rust mà ở nhg ngôn ngữ khác nữa để so sánh và mở rộng kiến thức.


## Đọc song ngữ {#đọc-song-ngữ}

Ok, ngoài ra thì cuốn sách đó bằng tiếng Anh nên để hỗ trợ cái rào cản ngôn ngữ thì mình cũng demo cái cách mà dịch toàn bộ cái website / sách đó bằng Google Translate cho các bạn nào chưa biết.

-   Vào website <https://translate.google.com/> Chuyến sang tab `Websites`
-   Copy đường dẫn của trang web muốn dịch. Ở đây là <https://doc.rust-lang.org/book/> và dán vào ô input Website và nhấn `Tiếp theo`


## Thiết lập công cụ và môi trường lập trình {#thiết-lập-công-cụ-và-môi-trường-lập-trình}


### Linux hoặc MacOS {#linux-hoặc-macos}

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```


#### MacOS xcode {#macos-xcode}

Trên MacOS bạn cần cài đặt thêm xcode bằng lệnh sau:

```bash
xcode-select --install
```


### Windows {#windows}

<https://doc.rust-lang.org/book/ch01-01-installation.html#installing-rustup-on-windows>


### VS Code {#vs-code}

Trong nhg năm gần đây, `VS Code` hiện tại có vẻ là lựa chọn mặc định khi các bạn bắt đầu học lập trình. Các bạn có thể tải VS Code tại

<https://code.visualstudio.com/>


#### Extension {#extension}

Sau khi cài xong `VS Code` thành công. Thì để lập trình Rust các bạn cần cài thêm plugins:

-   Rust
-   rust-analyzer

Là 2 plugins hỗ trợ đầy đủ cho các tác vụ của các bạn lúc lập trình như: code highlight, linting, diagnose, run, compile, refactor, document, suggestion, etc.


#### Emacs {#emacs}

Các video sau mình sẽ sử dụng `Emacs` để viết chương trình vì đó là môi trường làm việc quen thuộc của mình. Nhg các công cụ trên đều sẽ vận hành tương tự như trong VS Code.


## Hello, World {#hello-world}


### Chương trình cơ bản {#chương-trình-cơ-bản}

```bash
mkdir ~/projects
cd ~/projects
mkdir hello_world
cd hello_world
```

```rust
fn main() {
    println!("Hello, world!");
}
```

```bash
rustc main.rs
./main
```

```nil
Hello, world!
```


### Chương trình đc quản lý với Cargo {#chương-trình-đc-quản-lý-với-cargo}

```bash
cargo --version
```

```bash
cargo new hello_cargo
cd hello_cargo
```

```yaml
[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

[dependencies]
```

```bash
cargo build
cargo run
```
