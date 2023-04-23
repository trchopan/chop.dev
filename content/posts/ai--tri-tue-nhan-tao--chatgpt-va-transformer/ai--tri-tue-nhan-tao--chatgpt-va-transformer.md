+++
title = "AI: Trí tuệ nhân tạo, ChatGPT và Transformer"
author = ["Chop Tr (chop.dev)"]
description = "AI là một lĩnh vực mà mình cũng mới bắt đầu nghiên cứu đào sâu cho công việc hiện tại thôi. Mới tìm hiểu qua nó trong tháng vừa rồi thì thấy có nhiều điều thú vị trong việc tích hợp nó vào các hệ thống mà mình đang làm."
date = 2023-04-07T00:00:00+07:00
tags = ["ai", "openai", "tutorial", "chatgpt", "text", "generation", "chatbot", "intelligent", "document"]
draft = false
cover = "/posts/ai--tri-tue-nhan-tao--chatgpt-va-transformer/ai--tri-tue-nhan-tao--chatgpt-va-transformer-7.jpg"
+++

# Video

[https://www.youtube.com/watch?v=uynzWvUWl_k](https://www.youtube.com/watch?v=uynzWvUWl_k)

# Intro

Xin chào các bạn. Chop trở lại với một video mới. Video lần này là về AI viết tắt của Artificial Intelligence - Trí tuệ nhân tạo.

Thì AI là một lĩnh vực mà mình cũng mới bắt đầu nghiên cứu đào sâu cho công việc hiện tại thôi. Mới tìm hiểu qua nó trong tháng vừa rồi thì thấy có nhiều điều thú vị trong việc tích hợp nó vào các hệ thống mà mình đang làm.

Nên mình làm video tổng hợp lại những thứ vừa mới học.

# Thì đầu tiên AI là gì?

Đây là một lĩnh vực trong khoa học máy tính và công nghệ thông tin, nghiên cứu về việc dùng khả năng của máy tính để thực hiện các tác vụ thông minh mà trước đây chỉ có con người mới có thể làm được.

AI được áp dụng rộng rãi trong nhiều lĩnh vực như y tế, tài chính, sản xuất, giao thông vận tải, giáo dục và nhiều lĩnh vực khác. Các ứng dụng của AI đang ngày càng phát triển và trở nên phổ biến hơn trong cuộc sống hàng ngày.

Và công nghệ mới nổi gần đây mà làm mọi người nhận ra sức mạnh của AI chính là ChatGPT của OpenAI.

ChatGPT là một hệ thống giao tiếp bằng những câu đối thoại chat, được xây dựng trên nền tảng sử dụng mô hình Generative Pretrained Transformer viết tắt là GPT - Tạm dịch là mô hình chuyển hoá tự học tự phát được đào tạo trước.

ChatGPT được huấn luyện trên một lượng lớn dữ liệu văn bản và có khả năng tạo ra các đoạn văn bản tự động dựa trên những tài liệu mà nó được học.

Lượng lớn ở đây đối với ChatGPT là lên tới level terabyte, petabyte lận ha. Lấy các nguồn công cộng như wikipedia, github hay các báo tin tức, sách và tài liệu v.v. Nói chung là tất cả những tài liệu và data mà OpenAI có thể lấy được.

Khả năng của GPT thì các bạn nào trải nghiệm thử có thể thấy nó có khả năng trả lời người dùng dựa vào kiến thức mà nó đã được học.

Các bạn có thể hỏi nó câu như "các món ăn truyền thống ở Việt Nam là gì?". Sẽ được một danh sách mà đọc là chảy nước miếng luôn. Phở, Bánh mì, Bún chả, Gỏi cuốn, Bánh xèo đồ.

Các bạn có thể hỏi thêm nó "Quán phở nào ngon ở TP Hồ Chí Minh" sẽ nhận được Phở Thìn, Phở Lệ, Phở Hoà. Là dân Xì Gòn thì mình có thể xác định đây đều là những quán bán phở ngon nhức nách thành phố.

Thì các bạn cũng có thể hình dung đây là một công nghệ mang tính chất đột phá hiện tại. Mình nghĩ chỉ vài năm nữa thôi AI sẽ là 1 phần trong cuộc sống của chúng ta.

Không biết các bạn còn nhớ cái thời mới có facebook không, khi việc kết nối và cập nhật thông tin của bạn bè cách nhau nửa vòng trái đất dễ dàng với vài nút bấm trên điện thoại đã làm nổi lên cuộc cách mạng thông tin. Và bắt đầu cái khái niệm mạng xã hội. Mà trước mọi người chỉ trao đổi bằng email hay chat yahoo messenger đồ thôi.

Thì AI cũng có khả năng thay đổi cuộc sống của chúng ta như vậy. Thay đổi cách chúng ta giao tiếp với thông tin. Cách chúng ta xử lý công việc hằng ngày.

Nó có thể làm cho công việc của chúng ta dễ dàng hơn rất nhiều thông qua việc hỗ trợ chúng ta tìm kiếm thông tin. Hoặc giúp chúng ta tạo ra các kết quả công việc được nhanh hơn bằng cách tự tạo ra các mẫu thông tin hoặc sản phẩm như hình ảnh video.

Ví dụ như giúp chúng ta tóm tắt một đoạn tài liệu, tổng hợp một bài viết nào đó.

Về viết lách nó cũng có thể giúp chúng ta soạn thảo tài liệu. Như chính video này cũng là 1 cái demo áp dụng AI luôn. Script cho video này mình cũng dùng ChatGPT để hỗ trợ tạo ra.

Về phần các công việc về hình ảnh hay video thì mình cũng đã thử qua Stable Diffusion để tạo ra những hình ảnh tuyệt đẹp chỉ trong vài phút. Áp dụng công nghệ Diffusion, là công nghệ tạo ra hình ảnh dựa trên hệ thống khuếch tán.

OpenAI nó cũng có 1 dịch vụ tương tự là Dall-E cũng xử lý việc tạo ra hình ảnh bằng mô tả tương tự như Stable Diffusion.

# Tìm hiểu về Transformer

Ok. Thì với góc độ của một lập trình viên như mình thì những công nghệ này rất thú vị. Mình muốn tích hợp sức mạnh của nó vào trong công việc cũng như ứng dụng nó trong các hệ thống mà mình đang và sẽ làm sắp tới nên cũng đào sâu nghiên cứu về AI.

Về công nghệ thì bước ngoặt trong nghiên cứu đào tạo AI hiện giờ đó chính là mô hình Transformer.

Đó là một kiểu kiến trúc để xử lý Training Neural Network - là Đào tạo trên Mạng thần kinh.

Thì trước đây Neural Network là một loại mô hình rất hiệu quả để phân tích dữ liệu như hình ảnh, video, âm thanh, văn bản.

Nhưng có nhiều loại Neural Network khác nhau được tối ưu hóa cho các loại dữ liệu khác nhau.

Ví dụ như nếu bạn đang phân tích hình ảnh, thông thường bạn sẽ sử dụng Convolutional Neural Network (CNN), được thiết kế để bắt chước cách bộ não con người xử lý tầm nhìn từ mờ đến rõ.

Và kể từ khoảng năm 2012, các cái neural network đã thực sự giỏi trong việc giải quyết các nhiệm vụ về tầm nhìn, phân biệt màu sắc, hình dạng và cả xử lý âm thanh.

Nhưng trong một thời gian dài, chúng ta không có sự phát triển tốt lắm cho việc phân tích ngôn ngữ, cho dù là phiên dịch, tóm tắt văn bản, hoặc tạo văn bản.

Và đây là một vấn đề khá nhức nhối, bởi vì ngôn ngữ là cách chính mà con người giao tiếp. Nếu giải quyết được vấn đề này thì việc trao đổi giữa các hệ thống máy tính và con người sẽ trở nên dễ dàng hơn rất nhiều.

## RNN

Thì trước khi có mô hình Transformer thì thường việc train AI để xử lý ngôn ngữ sử dụng mô hình là Recurrent Neural Network - dịch là Mạng thần kinh tái phát.

Mình xin phép trích video của chị Julia một kỹ sư Google phân tích và so sánh RNN với Transformer khá rõ và chi tiết.

![](/posts/ai--tri-tue-nhan-tao--chatgpt-va-transformer/ai--tri-tue-nhan-tao--chatgpt-va-transformer-0.jpg)

Cách RNN xử lý ngôn ngữ là nó loopback context trong cái hidden states để chuyển hoá embedding của 1 chuỗi các token ra thành Contextual embeddings.

Giả sử bạn muốn dịch một câu từ tiếng Anh sang tiếng Việt.

Một mạng lưới RNN sẽ lấy đầu vào là một câu tiếng Anh "on the river bank" và xử lý từng từ một, và sau đó tuần tự output ra các từ tiếng Việt.

Mỗi cell trong RNN các bạn có thể hình dung là 1 cái encoding của từ mà nó đang xử lý. Bên trong nó giữ 1 cái internal state hay Hidden state H giữ context của các từ trước đó, được dùng để tạo ra Output contextual Embedding là Y.

Ngoài ra RNN còn có 1 đặc điểm nữa là xử lý từ trái sang phải.

Có nhiều ngôn ngữ khác nhau và không phải ngôn ngữ nào cũng xử lý từ trái sang phải và không phải ngôn ngữ nào cũng theo cấu trúc Chủ ngữ Động từ Vị ngữ.

Nên việc xử lý như RNN sẽ không thể áp dụng hiệu quả cho những ngôn ngữ khác sau khi train. Mà mỗi ngôn ngữ phải xử lý một dạng riêng.

Ok thì điểm đáng chú ý ở đây là tính tuần tự, tính lệ thuộc lẫn nhau của các từ trong câu. Làm cho việc xử lý bằng RNN chỉ có thể xử lý ở dạng tuần tự từng từ một từng token một. Xử lý token sau diễn ra tiếp theo token trước nó.

Trong video trước mình cũng đã đi qua các hệ thống xử lý kiểu lệ thuộc này và sự kém hiệu quả khi sử dụng các hệ thống đó. Trong video cũng giới thiệu sơ về lập trình concurrency là kiểu xử lý các công việc độc lập với nhau dẫn đến việc có thể được xử lý song song nhiều tác vụ.

Ai muốn xem qua video trước thì link trong description ha.

Ok quay lại. Thì làm cách nào chúng ta cải tiến mô hình RNN khỏi cái nút thắt cổ chai này.

Đó chính là  áp dụng mô hình Transformer.

## Transformer

Thì Transformer là một mô hình được phát triển bởi các nhà nghiên cứu Google và được giới thiệu và công bố trong một tài liệu tên là "Attention is All You Need", phát hành tháng 12 năm 2017.

Tài liệu này cũng không dài lắm chỉ 10 trang A4 thôi. Bạn nào muốn đào sâu thêm về AI có thể cầm lên đọc trong vòng không quá 1 tiếng.

Ok thì mình sẽ đi qua các thông tin trong tài liệu này để hiểu hơn về Transformer ha.

![](/posts/ai--tri-tue-nhan-tao--chatgpt-va-transformer/ai--tri-tue-nhan-tao--chatgpt-va-transformer-1.jpg)

Thì đi sơ qua cái sơ đồ chính trong tài liệu. Nhìn sơ cũng không phức tạp lắm.

Có 2 khái niệm làm cho mô hình này giúp giải quyết cái việc training AI cực tốt. Chính là Positional Encoding và Attention.

## Đầu tiên là Positional Encoding.

Giả sử chúng ta đang cần dịch văn bản từ tiếng Anh sang tiếng Việt.

Position Encoding là ý tưởng mà trước khi đưa các giá trị input output embeddings vào neural network, chúng ta gán chúng một con số 1, 2, 3, tùy thuộc vào thứ tự từ nằm trong câu.

Có nghĩ là chúng ta lưu trữ thông tin về trật tự từ trong chính dữ liệu, hơn là trong cấu trúc của nó trong câu.

Sau đó, khi chúng ta train trên nhiều dữ liệu văn bản, thì cái model nó sẽ học cách diễn giải các position encoding theo vị trí tương quan giữa các từ trong văn bản.

Nghe đơn giản vậy thôi nhưng nó góp phần rất lớn trong tổng thể hệ thống train này.

## Self-attention

![](/posts/ai--tri-tue-nhan-tao--chatgpt-va-transformer/ai--tri-tue-nhan-tao--chatgpt-va-transformer-2.jpg)

Khái niệm thứ 2 là Self-attention. Đây mới là khái niệm đóng vai trò quan trọng trong sự phát triển của công nghệ AI trong những năm gần đây và cũng là lý do tại sao chúng ta sử dụng Transformer.

Cơ chế Self-attention là một cấu trúc neural network cho phép một model khi xử lý văn bản xem xét từng token đơn lẻ trong câu gốc trước khi đưa ra quyết định về cách dịch hay tạo ra output.

Trong tài liệu "Attention is All You Need" mô tả chỗ này giống như tạo ra một cái heatmap của mối quan hệ giữa các từ vậy.![](/posts/ai--tri-tue-nhan-tao--chatgpt-va-transformer/ai--tri-tue-nhan-tao--chatgpt-va-transformer-3.jpg)

Xử lý Self-attention chúng ta sẽ có Key, Query và Value. Cả 3 khái niệm này được diễn tả duối dạng vector ha.

Key là dùng để Transform token thành một vector Key0 Key1 Key2 v.v

Có thể hình dung vector này mà những cái từ khoá trong một cái dictionary. Dùng để map chúng với một giá trị value nào đó.

Query là để Transform Non-Contextual Embedding thành một mảng khác thể hiện một cái Contextual Embedding.

Có Key và Query chúng ta có thể Dot Product chúng để ra tạo ra vector gọi là Attention Scores.

Ở đây thì nếu các bạn muốn tìm hiểu thêm về Dot Product, duality và Transformation thì có 1 video về Linear Algebra khá hay về chủ đề này của kênh youtube 3Blue1Brow.

Video này giải thích cực dễ hiểu cùng với hình ảnh minh hoạ rất trực quan. Link trong description ha. Ah Linear Algebra là đại số tuyến tính ha.![](/posts/ai--tri-tue-nhan-tao--chatgpt-va-transformer/ai--tri-tue-nhan-tao--chatgpt-va-transformer-4.jpg)

Ok thì quay lại mô hình, có Attention Score chúng ta có thể nhân với ma trận value và Sum lại với nhau. Cho ta một output Y là weighted sum của Values. Và chúng ta có thể train trên giá trị này.

Ok thì chúng ta có những tập hợp Key, Query, Value này được gọi là Attention Head.

Quay lại sơ đồ trong tài liệu "Attention Is all you need". Nó có mô tả về việc có nhiều Attention Heads. Ở đây ghi là Multiple Attention Head.

Thì các bạn có thể hình dung Attention Head như là những yếu tố mà AI cần chú ý như Thì của câu, quá khứ hay hiện tại, hoặc token đang xem là động từ, tính từ hay danh từ, v.v

Và để kết hợp chúng lại với nhau chúng ta sẽ dùng FFNN - Feedforward Neural Network - Tạm dịch là Mạng thần kinh chuyển tiếp, để ra output Y.![](/posts/ai--tri-tue-nhan-tao--chatgpt-va-transformer/ai--tri-tue-nhan-tao--chatgpt-va-transformer-5.jpg)

Rồi thì tới đây các mình đã đi qua một cái luồng để tính ra một cái parameters.

Thì các bạn cũng thấy để tính ra 1 cái tham số parameter khá là kỳ công. Chỉ để tính ra thông tin attention của từ hiện tại với những từ xung quanh nó.

Nhưng mà để ý kỹ thì các bạn sẽ thấy. Việc tính toán này tuy phức tạp không bị lệ thuộc vào việc tính toán ra tham số của các từ trước nó.

Mà chỉ cần quan tâm tới vị trí của từ và sự chú ý cá thể - self  attention - của từ đó. Sử dụng Vector hay Matrix Transformation để tạo ra tham số.

Dẫn đến việc là quy trình này có thể được chạy song song. Thì với phần cứng thích hợp chúng ta có thể train model với số lượng tham số lớn trong khoản thời gian ngắn hơn rất nhiều.

Áp dụng các chip GPU hay chuyên nghiệp hơn là sử dụng các chip Tensor của Google chuyên xử lý việc train AI trên các tính toán song song này để xử lý train AI sẽ nhanh và hiệu quả hơn rất nhiều.

Đó là lý do mô hình Transformer từ năm 2018 2019 đến nay trở thành một chuẩn mô hình mẫu áp dụng rộng rãi cho việc train AI và không chỉ với văn bản mà con cho hình ảnh, video.

Rồi từ đó cũng phát triển lên những công nghệ mới như hyper network, foundation model, transfer learning, v.v

Nhờ nó mà OpenAI, mới có thể phát triển nên ChatGPT vào năm 2018. Và bắt đầu train ChatGPT rồi ChatGPT 2 rồi 3, 3.5 và phiên bản mới nhất hiện tại là ChatGPT4.

Với số lượng tham số parameters khổng lồ lên tới hàng tỷ parameters của ChatGPT 3.5 và đạt con số nghìn tỷ parameter với ChatGPT 4.

# Demo

Thì để demo thử áp dụng công nghệ ChatGPT này mình đã tích hợp một chương trình giúp mình có thể chat với bất kỳ tài liệu văn bản nào.

Ok, nếu các bạn nào đã thử ChatGPT thì sẽ hiểu. AI nó không có ký ức.

Nếu các bạn hỏi nó về những câu tiếp theo trong chatbox thì nó chỉ trả lời câu hỏi mà chúng ta hỏi nó.

Chứ cũng không nhớ thêm thông tin chúng ta đưa ra. Bây giờ mình sẽ thử nghiệm với 1 con bot ChatGPT mà mình đang dùng.

Con bot này mình thiết kế gọi mình là Ba và xưng là con ha. Đang dùng nó làm AI assistant cho group chat gia đình mình. Bạn nào thấy thú vị thì làm 1 con khá là hữu ích đó :D

OK thì mình sẽ đưa một thông tin cho bot và hỏi nó thêm như sau:

> Khi ba đi làm thường mang theo 1 chai nước hạt chia. Con cho ba biết thêm về công dụng của hạt này ha.

Bot trả lời ngay công dụng của hạt chia rất rành rọt.

> Dạ Ba. Hạt chia là một loại thực phẩm giàu dinh dưỡng với nhiều lợi ích cho sức khỏe con người. lalala

Công dụng Giảm cân, Tốt cho tim mạch, Tốt cho tiêu hoá v.v

Rồi mình hỏi lại thông tin vừa rồi:

> Ok cảm ơn con. Ba đi làm hay mang theo gì?

Bot không nhận ra mình đang hỏi lại thông tin vừa mới cho nó lúc nãy. Mà bắt đầu trả lời mình nên mang theo những thứ gì khi đi làm.

> Bữa ăn trưa, trái cây, nước hoa quả, v.v

Mình cố hỏi lại một chút

> Ba hỏi lại chút. Là khi đi làm ba thường mang theo gì?

Nhưng bot vẫn không hiểu và cố trả lời những vật dụng mà mình nên mang như laptop, điện thoại, tai nghe.

Đến đây thì các bạn cũng thấy AI vẫn chưa phải hoàn hảo. Nó vẫn chưa có được ký ức về thông tin mình mà mình đưa ra.

Ah, ở đây nói thêm 1 chút. Là nếu các bạn đưa thông tin cho nó trong cùng một câu lệnh prompt thì nó sẽ hiểu và trả lời đúng ha. Như nếu trong cùng một promp hỏi nó: Tôi tên là Chop. Vậy tên của tôi là gì? thì nó sẽ trả lời được.

OK quay lại thì điều mà mình muốn xử lý ở đây là xây dựng thêm giải pháp mô phỏng việc AI có ký ức. Hoặc trong trường hợp này là có kiến thức về một tài liệu mà mình muốn nó biết đến.

Sau đó giao tiếp với AI để hỏi nó thêm về tài liệu đó.

Ok thì kiến trúc của app mà mình xây dựng sẽ như sau.

Trong app này thì mình xử lý transform tài liệu thành embeddings và đẩy thông tin embeddings lên 1 vector database để lưu trữ. Vector database nó sẽ đóng vai trò là Ký ức của AI vậy. Và mình sẽ dùng dịch vụ của Pinecone là một cái database chuyên xử lý Vector Database.

Và dùng ChatGPT làm mô hình LLM - Large Language Model để xử lý ngôn ngữ và giao tiếp. Nhiệm vụ của nó là parse embedding và transform giữa thông tin mình có trong vector database, thành thông tin mình cần, chính là những câu trả lời về tài liệu.

Model này một số tài liệu cũng gọi là Foundation Model.

Thì để kết hợp 2 module này lại với nhau mình sẽ dùng một framework là Langchain.

Framework này có nhiệm vụ giúp mình xử lý giao tiếp các API và cấu trúc data dễ dàng giữa 2 công cụ trên.

Các bạn có thể lên trang web của Langchain để tìm hiểu thêm về công cụ này. Nó khá là hiệu quả trong việc phối hợp các công cụ AI với nhau. Và có thể dùng để xử lý tài liệu, xử lý LLM, xử lý Agent, Indexes, Vector database, v.v

Như mình nói, là một framework cho AI. Có thể tưởng tượng như React hay Vue cho công nghệ Web. Hay Flask, Django với Python backend.

Ok thì mình thử upload CV của mình lên hệ thống để demo.

Hỏi mấy câu đơn giản thôi.

![](/posts/ai--tri-tue-nhan-tao--chatgpt-va-transformer/ai--tri-tue-nhan-tao--chatgpt-va-transformer-6.jpg)

> Đây là tài liệu gì vậy?

Thì bot biết được ngay đây là hồ sơ xin việc.

Xong hỏi tiếp

> Anh này đã từng làm ở những nơi nào và các dự án của anh tham gia thuộc lĩnh vực gì?

> Quang Tran đã từng làm tại ChatQ SG, H&M Media, và LINE Corp. Anh đã tham gia các dự án xây dựng hệ thống quản lý cho các bot tài chính trên Kubernetes cluster, diễn đàn hỗ trợ bệnh nhân, hệ thống đặt lịch hẹn với bác sĩ, tìm kiếm bệnh viện, kiểm tra triệu chứng bệnh, hệ thống điều trị trực tuyến, hệ

Câu trả lời hoàn toàn chính xác. Và các bạn chũng hiểu đây là thông tin bot biết thêm ha. OpenAI chắc không cho con ChatGPT mò ra cái CV của mình để học đâu.

Ngoài ra mình còn thiết kế bot có reference về là nó sử dụng tài liệu nào ở đâu để trả lời câu hỏi. Giúp mình có thể truy lại xem nó trả lời dựa vào thông tin nào trong tài liệu nếu cần.

Thì những câu hỏi và trả lời này cho mình khai thác sâu hơn về một chủ đề nào đó bằng cách giao tiếp với 1 con bot AI. Cảm giác trực quan hơn việc search Google và dò từng trang web rất nhiều.

Mình nghĩ vài năm nữa thôi việc search tìm kiếm thông tin sẽ bắt đầu đi theo hướng giao tiếp như vầy chứ không còn mò mẫm trong đống thông tin của các search engine nữa.

Và bằng chứng là cuộc chiến AI đang diễn ra giữa Google và Microsoft. Cả 2 đang chạy đua để đưa trải nghiệm mới này cho người dùng. Mà phần thắng thế có vẻ nghiên về Microsoft hơn khi mà Microsoft là một nhà đầu tư có cổ phần lớn trong OpenAI với cổ phần lên tới 1 tỷ đô.

Nếu các bạn muốn thử thì có thể tải trình duyệt Microsoft Edge mới về để chém gió với con AI, khá thú vị.

Ah có 1 điểm nữa là mình không train gì AI ở trong hệ thống demo này ha. Chỉ áp dụng nó thôi.

Train AI là một công việc khác cần phải phân biệt với việc áp dụng nó. Giống như việc lập trình ra Game Flappy Bird và việc bấm vài nút để chơi là khác nhau nha.

Thì hệ thống của mình chat với tài liệu mới là bập bẹ baby step, thử ứng dụng của AI thôi.

Sự phát triển của những project lớn nhỏ trong những năm tiếp theo mới là những thứ đáng quan tâm và học hỏi. Và chắc chắn mình sẽ thử học hỏi thêm để train AI model, fine-tune nó cho những nhu cầu về công việc và cho chính cả cá nhân mình.

# Conclusion

Những chia sẻ vừa rồi mình cũng mới tìm hiểu trong tháng vừa rồi thôi nhưng cũng phần nào hiểu được tìm năng của công nghệ này.

Trong video này thì mình mới thử nghiệm với việc xử lý văn bản thôi. Video sau mình sẽ đào sâu hơn về việc áp dụng nó trong việc xử lý media, hình ảnh và phim video.

Để demo trước thì các video mà các bạn xem sau đây đều được AI gerate ra. Mình đang nghiên cứu thêm để xem áp dụng những hệ thống này như thế nào. Xây cấu trúc hạ tầng ra sao. Tìm hiểu về các tài liệu nghiên cứu những cách ứng dụng chúng .v.v

Thì mình cũng thử share những sản phẩm AI làm được, như văn bản, hình ảnh hay video này cho vài bạn xem và họ cũng bắt đầu e dè về AI. Lo lắng tìm năng của nó. Lo sợ nó sẽ lấy mất việc của chúng ta trong tương lai.

Nhưng thực sự mà nói thì nó cũng phải được áp dụng bởi con người thôi.

Và theo mình thì việc chúng ta sợ chính xác không phải là sợ AI lấy mất việc của mình mà điều lo sợ là mình không có khả năng áp dụng nó tốt thôi.

Suy ra điều nên lo sợ không phải AI mà chính là bản thân mình không biết cách sử dụng nó.

Cảm ơn các bạn đã theo dõi tới đây. Xin chào và hẹn gặp lại. Chop out.



