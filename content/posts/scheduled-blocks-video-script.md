+++
title = "Học haskell qua code scheduled-blocks video script"
author = ["Chop Tr (chop.ink)"]
description = "Đây là một chương trình viết lại của một repo khác cũng đã thực hiện việc tính toán block slot leader trên blockchain Cardano. Source gốc viết bằng Python. Mình quyết định mục tiêu sẽ là convert hết các Chức năng và Công thức của repo đó thành Haskell, phục vụ việc học ngôn ngữ này."
date = 2022-03-01T00:00:00+07:00
tags = ["scheduled", "blocks", "learning", "haskell"]
draft = false
cover = "/ox-hugo/scheduled-block-script_20220301_234604.png"
images = "/ox-hugo/scheduled-block-script_20220301_234604.png"
+++

## Giới thiệu {#giới-thiệu}

Haskell là một ngôn ngữ thú vị, một thế giới mới đối với bất kỳ kỹ sư lập trình nào đã làm việc quá lâu với OOP - lập trình hướng đối tượng hay thế giới imperative programing (tạm gọi lập trình mệnh lệnh).

Có 2 mô hình lập trình (hay còn gọi là paradigms) là `imperative` (mệnh lệnh) và `functional` (chức năng).

2 ví dụ điển hình nhất của 2 paradigms này là `Java` - imperative và `Haskell` - functional.

Dưới đây là cùng 1 tác vụ là tính tổng các số từ `1` đến `10`. Mính sẽ sử dụng 2 paradigms lập trình để xử lý.


### Imperative {#imperative}

```java
int total = 0;

for (int i = 0; i < 10; i++) {
    total = total + i;
}
```

Lập trình imperative hay có các biến global và cách xử lý tác vụ thường là làm việc theo bước, ghi kết quả lên biến đó để sử dụng tiếp, trao đổi giữa các bước qua biến. Điều này có điểm hay là khá dễ hiểu như các bạn xem code Java ở trên. Nó gần hơn với lối suy nghĩ muốn làm việc A thì bạn có các bước sau: 1, 2, 3. Lập trình theo paradigm này mình có cảm giác như lập một `"Sách hướng dẫn"`.

Các bạn sẽ thấy khá nhiều các vòng lặp như `for-loop`, `while-loop` hay các conditionals như `if-else`.


### Functional {#functional}

```haskell
sum [1 .. 10]

sum :: [Int] -> Int
sum []     = 0
sum [n]    = n
sum (n:ns) = n + sum ns
```

Functional thì tập trung giải quyết cách xử lý đầu vào và đầu ra. Khi nhận đc A thì sẽ cho kết quả B. Và cách thực hiện tác vụ của nó sẽ chia thành tình huống xử lý như ví dụ trên. Trao đổi giữa code dựa trên kết quả trả về. Điểm hay của nó là khi lập trình các bạn sẽ phát triển 1 trực giác là suy nghĩ ngay đến các tình huống có thể sảy xa để xử lý. Lập trình theo paradigm này mình có cảm giác như lập một cái `"Hợp đồng"`.

Các bạn sẽ thấy khá nhiều chức năng như `map`, `filter`, hay kiểu dòng chảy logic như `Maybe`, `Either`. (đào sâu hơn thì các bạn sẽ đc gặp `Monad`, `Applicative`, etc.)


### - {#336d5e}

Xem thêm: <https://www.youtube.com/watch?v=sqV3pL5x8PI>

Ở đây không phải là so sánh tốt xấu, tất cả paradigms đều là những nguyên tác và lý luận để giải quyết vấn đề. Các bạn có thể hình dung nhg paradigms này như Đạo, có đạo Phật, đạo Chúa, v.v thì trong lập trình cũng vậy. Chỉ là người sử dụng hiểu mình muốn gì và áp dụng như thế nào.


## Mục đích dự án {#mục-đích-dự-án}

Đối với kinh nghiệm của mình thì không có gì hiệu quả bằng tự đặt ra 1 mục đích cho bản thân. Một cái gì đó mà mình có thể đạt đc để tập trung hết tất cả sức lực để tiến tới. Thông qua đó nhg thứ trên quãng đường sẽ trở thành kiến thức và kinh nghiệm.

Trên quãng đường học Haskell, không ít lần khó quá mình đã bỏ cuộc. Ngồi nghĩ phải chi học Rust thì hay ta (Ah tại trong lúc thực hiện dự án mình phải đọc 1 số implementation viết bằng Rust). Nhg nhờ kiên trì với mục tiêu tự đặt ra mình cũng đã hoàn thành đc thứ mình muốn.

Thì đây là một dự án mà mình tự đặt ra cho bản thân khi bắt đầu học Haskell (lần thứ 3 😛) .

Giới thiệu sơ thì mình là một `Stake Pool opperator`. Là một người vận hành `hồ cổ phần`. Trên hệ blockchain Cardano, nên mình cũng có một ít kiến thức về blockchain và hệ thống vận hành của Cardano.

Thì việc staking và vận hành hồ Cardano khác với các hệ blockchain khác là nó có thể tính trước được block đến hồ chính xác vào lúc nào. Công thức tính thì dựa trên khoá VRF Sign key (Verifiable Random Function).

Mục tiêu của mình viết lại của một repo khác cũng đã thực hiện việc tính toán này, source kia thì viết bằng Python. Mình sẽ convert hết các Chức năng và Công thức của repo đó thành Haskell, phục vụ việc học ngôn ngữ mới.


## Con đường {#con-đường}


### Lời đầu {#lời-đầu}

Video này mình đang không nhắm tới việc học Haskell từ căn bản. Mà chỉ muốn đi qua các giai đoạn mà mình trải qua trong quá trình thực hiện dự án. Nên sẽ đi khá nhanh qua các bước, hy vọng qua chia sẽ có thể làm cơ sở demo để các bạn thấy sự hứng thú trong quá trình làm việc với Haskell.

Tài liệu này đc viết bằng `org-mode` trên `Emacs`. Nếu các bạn sử dụng Emacs có thể tạo 1 project Haskell và dùng chức năng tangle để thử các đoạn code mẫu ở bên dưới.


### Chạy chương trình với args {#chạy-chương-trình-với-args}

Chương trình này sẽ là một chương trình command line. Nên việc đầu tiên mà mình học cách chạy chương trình với các arguments (hiểu là điều kiện chạy).

`Ví dụ:` Khi mình muốn tính các block đã được giao trong quá khứ (history) thì mình sẽ chạy chương trình như sau:

```bash
scheduled-blocks history --epoch 321
```


#### Demo {#demo}

<https://hackage.haskell.org/package/optparse-applicative>

```haskell
{-# LANGUAGE OverloadedStrings #-}
module Main where

import Options.Applicative
import Data.Semigroup ((<>))

data Sample = Sample
  { hello      :: String
  , quiet      :: Bool
  , enthusiasm :: Int }

sample :: Parser Sample
sample = Sample
      <$> strOption
          ( long "hello"
         <> metavar "TARGET"
         <> help "Target for the greeting" )
      <*> switch
          ( long "quiet"
         <> short 'q'
         <> help "Whether to be quiet" )
      <*> option auto
          ( long "enthusiasm"
         <> help "How enthusiastically to greet"
         <> showDefault
         <> value 1
         <> metavar "INT" )

main :: IO ()
main = greet =<< execParser opts
  where
    opts = info (sample <**> helper)
      ( fullDesc
     <> progDesc "Print a greeting for TARGET"
     <> header "hello - a test for optparse-applicative" )

greet :: Sample -> IO ()
greet (Sample h False n) = putStrLn $ "Hello, " ++ h ++ replicate n '!'
greet _ = return ()
```


### Query API {#query-api}

Chương trình này sẽ cũng giống như repo cũ, sẽ query API để lấy các "nguyên liệu" để tính. Đây cũng là một tác vụ phổ biến đối với bất kỳ chương trình nào và các bạn lập trình lâu năm chắc cũng đã phải làm công việc này cả triệu lần.

Trong Haskell thì khá là strong type. Strong hay Weak thì có nhiều tranh cãi. Nhg về cơ bản nó là ngôn ngữ có type safety check, and statically typing.

Nên khi query API, bắt buộc các bạn phải có kiểu Data để map hoặc parse kết quả trả về.


#### Demo {#demo}

<https://hackage.haskell.org/package/aeson>

<https://hackage.haskell.org/package/http-conduit-2.2.3.1>

<https://app.quicktype.io/>

```haskell
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}
module Main where

import           Data.Aeson
import           Data.Text                      ( Text )
import           GHC.Generics                   ( Generic )
import           Network.HTTP.Client.Conduit
import           Network.HTTP.Simple

data ArmadaNonce = ArmadaNonce
  { epochArmadaNonce :: Int
  , nonceArmadaNonce :: Text
  }
  deriving (Show, Generic)

instance ToJSON ArmadaNonce where
  toJSON p =
    object ["epoch" .= epochArmadaNonce p, "nonce" .= nonceArmadaNonce p]

instance FromJSON ArmadaNonce where
  parseJSON = withObject "ArmadaNonce"
    $ \v -> ArmadaNonce <$> v .: "epoch" <*> v .: "nonce"


main :: IO ()
main = do
  let request =
        setRequestMethod "GET"
          $ setRequestHost "nonce.armada-alliance.io"
          $ setRequestPath "/current"
          $ setRequestResponseTimeout (responseTimeoutMicro (10 * 1000 * 1000))
          $ setRequestHeader "Content-Type" ["application/json"] defaultRequest

  response <- httpLBS request

  let eitherResult =
        (decode . getResponseBody) response :: Maybe ArmadaNonce

  print eitherResult

```


### Viết test case {#viết-test-case}

là một thói quen khi lập trình của mình. Các bạn lập trình lâu năm sẽ hiểu đc thói quen này đáng giá như thế nào. Vì các chương trình của các bạn khá là đồ sộ, không dễ dàng để spin up (khởi động) chương trình lên và test nhanh đc.

Nên khi nhảy vào làm project một trong những thứ mình học là cách viết test case.


#### Demo {#demo}

<https://hspec.github.io/>

Thêm phần config sau vào `cabal` file

```nil
test-suite test
  main-is:        Spec.hs
  type:           exitcode-stdio-1.0
  hs-source-dirs: test
  build-depends:
    , base   ^>=4.14.3.0
    , hspec
```

```haskell
module Main where

import           Test.Hspec

main :: IO ()
main = hspec $ do
  describe "Prelude.read" $ do
    it "can parse integers" $ do
      read "10" `shouldBe` (10 :: Int)

    it "can parse floating-point numbers" $ do
      read "2.5" `shouldBe` (2.5 :: Float)
```


### Chuẩn bị kết quả mẫu - Test Samples {#chuẩn-bị-kết-quả-mẫu-test-samples}

Đây là một dự án viết dựa trên công thức đã có sẵn nên mình cần chuẩn bị một loạt các kết quả mong muốn để thực hiện việc so sánh kết quả trong lúc thực hiện - implement.

Mình sẽ đi qua tài liệu mà mình viết khi chuẩn bị các thông số. (Tài liệu này đc viết bằng tiếng Anh để bất kỳ ai cũng có thể tái thực hiện các bước nếu muốn).

<https://chop.ink/posts/test-procedure-for-scheduled-blocks/>


## Nối tất cả lại với nhau {#nối-tất-cả-lại-với-nhau}


### Demo toàn bộ chương trình {#demo-toàn-bộ-chương-trình}


## Lời Kết {#lời-kết}

Qua trải nghiệm thì chương trình này cũng không quá khó. Nhg nó thể hiện được khá nhiều các chức năng của một chương trình viết trên Haskell.

Ở đây mình chưa có nhiều kiến thức sâu về Haskell vì mới học đc vài tháng. Nên chưa xử lý hợp lý đc các tình huống như kiểu dữ liệu, xử lý cấu trúc thư mục hay cũng như chưa nắm đc các cách lập trình chạy concurrency.

Nghiên cứu tham khảo thì Haskell khá mạnh với `Software Transactional Memory mechanism (STM)` - Cơ chế bộ nhớ giao dịch phần mềm. Vì nó tính chất thuần functional, Haskell có khả năng đảm bảo các biến STM không đc sửa đổi bên ngoài các monad STM.

Chương trình của mình cũng có thể đc cải tiến hơn nếu chạy concurrent các API query thông số. Mình cũng đã chạy thử concurrent các phép tính slot leader nhưng kết quả hoàn toàn không tốt hơn do các phép tính đều là pure function nên cũng đc Haskell tự tối ưu sẵn trong quá trình thực thi (execution).

Có một điểm trong quá trình thực hiện dự án là việc làm quen với các tài liệu và hỏi đáp trên `StackOverflow`. Lúc đầu chắc các bạn nào mới tiếp cận sẽ thấy hơi rối vì các tài liệu khá là khó theo. Điều này đúng với các thư viện cũ hay thư viện cốt lõi của Haskell, có vẻ như các bác maintainer cũng lười viết chi tiết mô tả hướng dẫn vì mặc nhiên đây là các kiến thức cơ bản. Với các thư viện popular hơn, nhiều người sử dụng cũng như nhiều người maintain thì đc viết khá rõ ràng và đầy đủ.

Nhìn chung thì qua trải nghiệm project nhỏ trên mình cảm thấy môi trường và trải nghiệm code (Dev Experience) với Haskell khá là thú vị và là một công cụ tốt trong túi đồ lập trình của mình. Sẽ sử dụng nhiều hơn trong tương lai.

Cảm ơn các bạn đã theo dõi tới đây. Xin chào.
