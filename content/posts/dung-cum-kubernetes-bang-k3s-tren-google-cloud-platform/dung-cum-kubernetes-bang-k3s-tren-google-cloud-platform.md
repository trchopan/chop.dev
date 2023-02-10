+++
title = "Dựng cụm Kubernetes bằng K3s trên Google Cloud Platform"
author = ["Chop Tr (blog.chop.dev)"]
description = "Ở nhà có 2 cái máy Raspberry Pi không xài nên mình quyết định học lại Kubernetes để deploy một số workload hiện đang quản lý. Trước tiên là sử dụng các VM miễn phí trên GCP để thực hành. Đợt này là cơ hội tốt vì hiện đang có chương trình miễn phí cho các VM chạy arm64."
date = 2023-01-07T00:00:00+07:00
tags = ["kubernetes", "cicd", "argocd", "circleci"]
draft = false
cover = "/posts/dung-cum-kubernetes-bang-k3s-tren-google-cloud-platform/dung-cum-kubernetes-bang-k3s-tren-google-cloud-platform-2.jpg"
+++

# Video

[https://www.youtube.com/watch?v=x5AsksInSHc](https://www.youtube.com/watch?v%3Dx5AsksInSHc)

# Script

Xin chào các bạn. Chop quay lại với video mới. Video lần này là về DevOps. Một mảng khá hay trong career path của mình. Mình thì đụng DevOps cũng không nhiều lắm vì nghề chính là làm là lập trình viên, là coder thôi.

Sự là nhà có dư ra 2 cái Raspberry Pi nên mình muốn dùng nó để làm thành 1 cái cluster Kubernetes để vừa học vừa vọc chơi, thêm kiến thức.

Trước thì mình cũng có làm việc với Kubernetes một thời gian, cũng lâu rồi, chắc cũng hơn 3 năm trước, ở công ty cũ. Đợt đó là công ty đó có 1 bạn DevOps vừa mới nghỉ việc, nên thiếu người, mình thì đang ngồi ở vị trí code web bèo bèo thôi. Lúc đó là code xong cái web rồi nên đang rảnh. Thế là mò qua ngồi chơi với mấy bạn BE, ai dè quay qua hỏi muốn handle mấy cục API này không cái gật đầu luôn.

Đợt đó mình handle cũng không nhiều lắm với thời gian tầm 6 tháng thôi nên kinh nghiệm DevOps rất rất non.

Anyway, thì hôm nay áp dụng các kiến thức của 3 năm trước vào setup dựng lên hệ thống Kubernetes xem còn smooth như trước không ha.

## Introduction to Kubernetes

Ok thì Kubernetes là gì?

"Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications."

Kubernetes, còn được gọi là K8s, là một hệ thống mã nguồn mở để tự động hóa việc triển khai, mở rộng quy mô và quản lý các ứng dụng được đóng gói.

Có mấy cái keywords mà cần research là:

- automating: là Tự động hoá
- deployment: là tự động hoá các bước thực thi việc triển khai
- scaling: là tự động hóa việc mở rộng hoặc thu hẹp quy mô
- containerized applications: là các ứng dụng được đóng gói. Ở đây là các Docker container (tiếng Việt là công tơ nơ)

## Example Kubernetes use case

Ví dụ sơ 1 cái ứng dụng của Kubernetes là như vầy ha.

Ví dụ mình có vài cái service được public để sử dụng. Ví dụ thực tế luôn 1 con service mà mình đang quản lý là 1 cái dịch vụ để các bạn trader trong nhóm trader Binance dùng để đặt lệnh tự động trên sàn giao dịch Binance.

Con service này hiện đang phục vụ cho 1 nhóm nhỏ thôi và đang nằm trên cục Raspberry Pi này của mình nè.

Giờ thì nó có 5 10 người xài thôi mỗi người thì có khoản hơn 20 30 các chiến lược đặt lệnh nên workload của nó cũng không nhiều con RPi này là dư sức xử. Ngày tầm vài trăm ngàn request là cùng.

Nhưng mà thử tưởng tượng dự án này phình lên cấp số nhân từ 5 10 user thành 100 200 users. Số lượng request nhiều lên và mình phải scale máy lên.

Ok thêm 1 con Raspberry Pi nữa chắc đủ. Thì setup thôi, cài hệ điều hành. Phân quyền, nâng cấp. Setup các biến môi trường, setup các cổng để giao tiếp với internet.

Í mà giờ có 2 máy, là phải xử lý thêm 1 cái Load Balancer để truyền traffic về 2 máy này.

Vài ngày sau, thì nghe lượng user lại tăng lên gấp 4 lần, 2 máy không đủ rồi phải 8 máy ha. Nghe vậy thì nghĩ tới các công đoạn setup OS, chăm từng con node thì hok đủ sức rồi, chắc phải thuê thêm nhân sự. Mà chắc ko xài raspberry xài VM ha, hay mua 1 con server để xử.

Tới đây thì các bạn cũng hình dung cái quy trình scale up có vấn đề rồi đúng ko?

Và các bác kỹ sư ở Google mới ngồi lại bàn với nhau, họ cần 1 công cụ để chuẩn hóa các quá trình này và làm smooth các cái công đoạn thực hiện và thực thi triển khai.

Và Kubernetes ra đời từ đó.

Tới đây thì các bạn cũng có thể chém lại, ủa tui tự manage server thấy cũng ô sờ kê mà. SSH vô, gõ có vài lệnh để setup rồi cứ thế mà server chạy phà phà có gì đâu mà phải phát minh đẻ ra cục có cái tên dài hoằn khó đọc.

SSH vô thấy thủ công quá thì xài Ansible - cũng là 1 giải pháp Ô sờ kê cho việc tự động hoá các bước.

Ở thì đúng là tự làm cũng đc, đâu ai cấm. Như một vài công ty mà mình làm cũng có mindset đó. Một phần vì họ không có kỹ sư DevOps chuyên về mảng này. Và cũng chưa cần tới. Thì việc deploy lên 1 2 cái VM cho đơn giản là giải pháp hoàn toàn ổn.

Trả lời lập luận trên thì SSH vô gõ lệnh hay xài Ansible thì mỗi người mỗi kiểu. Team project này làm 1 kiểu playbook, team project kia làm 1 kiểu =Khó hiểu nhau. Nên cần 1 cái chuẩn hay 1 công nghệ chung như kubernetes.

Như các bạn có thể hình dung, là tới một lúc nào đó thì scaling là 1 vấn đề cần giải quyết. Không những scaling mà còn tối ưu hoá tài nguyên nữa. Các cơ chế và tính năng thêm của K8s còn giúp bạn scale lên xuống các tài nguyên mượt mà luôn. Còn nữa, K8s như nói ở trên là một chuẩn chung và được áp dụng rộng rãi nên tốc độ phát triển, nâng cấp rất cao, features được sinh ra cũng như bug được xử lý nhanh và các câu hỏi Stackoverflow hay các tài liệu học cũng rất nhiều.

Và nếu là 1 kỹ sư fullstack thì mảng kiến thức này cũng là công cụ không thể thiếu trong gói đồ nghề.

## K3s distribution

Ok thì bây giờ mình sẽ thực hiện việc setup lên 1 cụm Kubernetes ha.

Đầu tiên thì giải thích sơ, hầu hết mấy cái Cloud services như Google Cloud Platform, Amazon AWS, họ có sẵn dịch vụ chạy Kubernetes rồi chỉ việc bấm vài cái nút  là các bạn có thể có 1 cụm Kubernetes xài thoải mái. `kubectl` vào ngon lành.

Nhưng mà để hiểu sâu hơn và có một góc nhìn sâu hơn, cùng trải nghiệm thực tế hơn, thì bỏ ít công sức tự tay setup lên 1 cụm sẽ giúp mình học thêm được rất nhiều các cơ chế hoạt động bên dưới của Kubernetes ha.

Kubernetes như mình tả ở trên thì nó giống 1 cái chuẩn, hay 1 công nghệ hơn là 1 công cụ cầm vô xài. Và vì vậy có khá là nhiều distribution cho Kubernetes, như Rancher, Mirantis, AWS thì có EKS, Google có GKE v.v

Nhu cầu của mình thì để học và sử dụng cho cá nhân thôi nên sẽ thực hành việc setup cụm Kubernetes này sử dụng K3s - là một distribution Kubernetes focus việc gọn nhẹ - lightweight thôi. Và hỗ trợ CPU cấu trúc ARM nên mình có thể áp dụng cho 2 con RPi.

Ok tới đây thì đi qua cái cơ chế hoạt động 1 chút.

Thì cái architecture - hay kiến trúc - của thg K3s hay Kubernetes nói chung nó hoạt động trên cơ chế máy điều phối và máy thực thi công việc. Ở đây gọi là Server và Agents, tài liệu khác có khi gọi là Server và Slave nhưng vì cái trend không xài từ nhạy cảm nên dần chuyển sang Server và Agents hết rồi.

Tài liệu cho K3s thì ở link này [https://docs.k3s.io/architecture](https://docs.k3s.io/architecture)

Architecture có 2 kiểu:

### 1/ Là kiểu HA - là High Availability

### 



HA là High Availability là có tính sẵn sàng cao. Trên sơ đồ này thì có 3 con Server và 3 con Agents làm việc với nhau. Nhưng mà càng nhiều node thì càng tốt ha. Server đóng vai trò điều phối và sẽ giao tiếp với Agent. Cơ chế là biểu làm gì thì làm cái đó. Agents nhận mệnh lệnh của Server và thực thi.

Các setting và config của server sẽ được lưu vào Database như mũi tên ở đây. Đây được hiểu là server nào cũng kết nối với DB để lưu và lấy dữ liệu.

Ok, và để nói chuyện với Server thì chúng ta sử dụng phần mềm `kubectl` và thông qua 1 cái Load Balancer để truyền lệnh bằng cách gọi API trên Server. `kubectl` là phần mềm chuẩn để thao tác trên kubernetes nên có thể tương tích với K3s.

Các giao tiếp bên ngoài, được ký hiệu ở đây là External Traffic, cũng sẽ thông qua 1 cái Load Balancer để giao tiếp với các con Agents.

### 2/ Là kiểu Single server setup



![](/posts/dung-cum-kubernetes-bang-k3s-tren-google-cloud-platform/dung-cum-kubernetes-bang-k3s-tren-google-cloud-platform-0.jpg)

Kiểu này thì không HA nhưng mà phù hợp với 1 cụm Kubernetes nhỏ để học và không phức tạp quá để setup.

Ở đây các bạn cũng có thể nhận ra điểm khác nhau với mô hình trên, chính là chỉ có 1 server nên chúng ta không cần kết nối với DB bên ngoài mà có thể sử dụng 1 máy VM và 1 cái embedded db để làm con Server này.

Chúng ta sẽ setup K3s theo cái mô hình Single Server này.

## Google Free VM - T2A

Ok để bắt đầu thì chúng ta cần 4 con VM. Và chúng ta sẽ sử dụng GCP vì hiện đang có chương trình miễn phí cho các máy VM xài chip ARM, code name của máy là T2A.

Các bạn có thể tham khảo thêm tại đây:

[https://cloud.google.com/compute/docs/general-purpose-machines#t2a_machines](https://cloud.google.com/compute/docs/general-purpose-machines%23t2a_machines)

Lưu ý là chương trình miễn phí này chỉ có hiệu lực tới tháng 4 2023, nên nếu các bạn làm theo sau tháng 4 thì chắc sẽ bị tính phí. Hoặc các bạn có thể sử dụng các Cloud khác ha. Thao tác cũng tương tự thôi, sẽ không khác nhau mấy. Kể cả làm trên Raspberry Pi cũng đc ha. Sau khi thử nghiệm tutorial này ổn với khi mà cái promotion của GCP hết hiệu lực mình sẽ dời tất cả infra này về Raspberry Pi thôi.

Việc tạo VM thì các bạn đầu tiên là tạo Project trên GCP xong vào cái tab [Compute Engine] này.

![](/posts/dung-cum-kubernetes-bang-k3s-tren-google-cloud-platform/dung-cum-kubernetes-bang-k3s-tren-google-cloud-platform-1.jpg)



Xong nhấn vào [Create Instance]

Chúng ta sẽ đặt tên server là server-1, sau này có cần HA thì server-2 server-3, v.v

Region như đề cập ở trên thì xài cái promotion của GCP cho mấy cái máy T2A miễn phí nên sẽ phải chọn us-central1 và máy T2A General Purpose, cấu hình nhỏ thôi 1 vCPU và 4 GB RAM.

Nhỏ vậy chứ cost 1 tháng của nó cũng phải 30$.

Rồi sau đó là đổi Boot Disk cho nó chút. Chuyển OS thành Ubuntu, mình thì thích xài đồ mới nên chọn release 22.10 ha. Nếu các bạn setup cho production thì nên xử mấy cái tech này an toàn chút, chọn bảng LTS là bảng Long Term Support.

Sẵn ở đây nâng dung lượng lên 20GB luôn. 10GB thấy chật chội quá.

Mấy cái config khác thì cứ để default.

Quên mất. Có phần Firewall này chút nữa mình sẽ phải config 1 chút. Là do phải mở cổng 6443 cho bên ngoài giao tiếp với con server này. Cụ thể là cho `kubectl` gọi vào.

Ok xong nhấn [Create] thôi.

Xong con Server. Thì con Agent cũng tương tự thôi. Mình sẽ tạo 2 con Agent. Đặt tên là `agent-1` và `agent-2`.

Cũng zone us-central1, cũng T2A.

Rồi chọn Boot Disk Ubuntu 22.10 luôn.

Ah nãy quên lưu ý, vì xài T2A nên phải chọn OS cho CPU kiến trúc arm64.

Cũng như thg Server Firewall mình sẽ config sau.

Ok Nhấn [Create Instance] thôi.

Chờ 1 chút thì con server sẽ được tạo.

## Server nodes

Đầu tiên là setup cho con server.

Các bạn có thể dùng tool `gcloud compute ssh` để SSH vào con server mong muốn.

Nhấn dầu mũi tên xuống ở đây xong chọn `gcloud` copy lệnh vào terminal rồi enter là vào đc server.

Về setup `gcloud` thì mình skip nhe. Các bạn có thể tự google để setup. Ở đây mình assume là các bạn đã quen với môi trường cloud và quen với thao tác SSH vào máy VM rồi.

Ok setup cho con server thì siêu đơn giản. Các bạn vào link này để xem thêm về các câu lệnh: [https://docs.k3s.io/installation](https://docs.k3s.io/installation)

Cái câu lệnh mà phải gõ vô là đây:

```bash
curl -sfL https://get.k3s.io | sh -s - server --tls-san <server_external_ip>
```

Lệnh trên sẽ cài các binary cli của thằng k3s. Cùng với setup service cho k3s luôn. Service ở đây là service của Systemd hong phải của kubernetes ha. Systemd service là để khi con VM nó có restart thì k3s cũng sẽ được tự động chạy sau khi khởi động. Tìm hiểu sâu hơn về Systemd các bạn có thể search Youtube nha.

Ngoài các công cụ của k3s thì nó cũng cài sẵn luôn script để uninstall. Xem thêm tại đây: [https://docs.k3s.io/installation/uninstall](https://docs.k3s.io/installation/uninstall)

Nếu các bạn muốn uninstall là xoá hết để setup làm lại thì có thể chạy 1 trong 2 cái script đó tuỳ vào là đang xử lý máy Server hay máy Agent.

Ok giờ thì con server đã setup xong. Có thể sử dụng lệnh `get node` để xem node đang chạy.

Các bạn muốn chạy các lệnh sử dụng binary của k3s thì phải sudo ở đầu. Ví dụ như sau:

```bash
sudo k3s kubectl get node
```

Ok node có vẻ ổn. Ở đây thì mới chỉ setup 1 con Server thôi nên đang hiện ở đây là 1 con. Trạng thái status là Ready và Role là master, aka là 1 con Server.

## Agent nodes

Đến con `agent-1` thì mình cũng sẽ SSH vào bằng lệnh `gcloud compute ssh` như con server.

Oh mà trước khi xử con agent thì mình phải lấy cái token của server. Token này sẽ được dùng để agent có thể kết nối với server, các bạn nào quen với API thì có thể hiểu đây như cái token để authen request từ con agent với server.

Dùng lệnh này để lấy token trên con server:

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

Và copy cái token này.

Ok quay lại con agent. Thì câu lệnh để cài đặt agent có cái format như sau:

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://<server_ip>:6443 K3S_TOKEN=<node-tokensh> -
```

Vào thì mình sẽ chạy câu lệnh cài đặt cho agent. Thay thế bằng server_ip và paste cái token vào.

Ok. Agent đơn giản vậy thôi. Vậy là xong.

Về lại con Server mình chạy `kubectl get node` lại sẽ thấy con `agent-1` ở đây.

Ok ổn, và giờ mình làm lại bước setup cho con `agent-2` cũng y hệt lệnh trên. Copy paste siêu nhanh.

Rồi, xem lại `kubectl get node` lần nữa. Đã có 1 con server và 2 con agents. Tuyệt vời.

## Setup kubectl on local

Thao tác với kubernetes thì nãy giờ mình xử lý trên con server. SSH vào và chạy `sudo k3s kubectl` đó. Mà vậy thì rất phiền.

Thường thao tác với kubernetes sẽ xài `kubectl`, tiện nhất là cài ngay trên máy local - Đây mình sử dụng con Macbook Air này.

Để kết nối với cụm kubernetes mới vừa tạo thì mình sẽ copy file config được generate trên con Server bằng cách cat ra như sau

```bash
sudo cat /etc/rancher/k3s/k3s.yaml
```

Copy nội dung file này về máy local bằng cách tạo 1 file `.kube/config` rồi paste nội dung vừa copy vào.

Sửa chỗ IP thành IP của con server nhe. Cái IP lấy ở đâu, thì các bạn có thể vô lại console của Google Cloud để xem ha. Vô copy cái External IP này ha.

Done.

Và vậy là có thể chạy kubectl gọi lên Server được rồi.

```bash
kubectl get nodes
```

Ok Ngon lành.

Oh chưa được, ở đây là do tường lửa của Google. Nó chặng hết các port chỉ mở các port nào được cho phép thôi.

Chúng ta phải làm 1 bước nữa là mở Port 6443 trên con Server Node để có thể dùng máy local kết nối vào.

Thao tác thì tùy hệ Cloud nhe. Trên GCP thì sẽ vào VPC Network xong vô cái network của mấy con VM mới tạo nãy. Và tạo 1 cái rule firewall cho phép truy cập vào bằng cổng 6443 cho VM nào có tag allow-k3s như vầy. - Ai xài AWS thì edit cái Inbound Rules nhe.

Ok vậy là xong. Thử lại trên local nào

```bash
kubectl get nodes
```

Ok. Giờ mới thực sự ngon lành.

## Install Kubernetes Dashboard

Tiếp theo chúng ta sẽ cài đặt Kubernetes Dashboard. Là một công cụ để visualize cái cụm Kubernetes thôi. Nhìn thì nó sẽ dễ hơn là gõ code và hình dung trong đầu.

Ngay trên trang kubernetes.io này luôn: [https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)

Mình sẽ sử dụng cái manifest recommend bằng cách copy dòng lệnh kubectl apply -f này và paste vô terminal.

Ok sau khi hoàn tất apply manifest thì mình sẽ phải cài đặt user. Lưu ý trong document thì cách tạo user này là để học thôi nha. Vì user sẽ có quyền admin. Để phân quyền kỹ hơn thì phải đọc docs và nghiên cứu thêm.

Apply 2 file này để tạo `admin-user`:

File này để tạo user `admin-user`

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
```

File này để tạo cái role cho nó

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

Sau khi 2 manifest đó được tạo hoàn tất thì chúng ta có thể lấy token của `admin-user` bằng lệnh sau

```yaml
kubectl -n kubernetes-dashboard create token admin-user
```

Rồi proxy vào cụm kubernetes bằng lệnh sau

```yaml
kubectl proxy
```

Và vào dashboard theo đường dẫn

```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

Token hồi nãy mình sẽ copy và paste vào đây để authen vô dashboard.

Ok vậy là vào được Dashboard. Các bạn có thể xem tình hình cụm kubernetes của mình tại đây.

Xem có bao nhiêu pod đang chạy.

Xem đang xài bao nhiêu CPU và bao nhiêu Ram.

Tiếp theo chúng ta sẽ deploy service lên cụm này để xem tụi nó chạy ha 😀

## Spin up some pods - Apple and Banana services

Đầu tiên là chuẩn bị 2 file sẵn để làm demo services

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apple-app
  labels:
    app: example-app
spec:
  replicas: 5
  selector:
    matchLabels:
      app: example-app
  template:
    metadata:
      labels:
        app: example-app
    spec:
      containers:
        - name: apple-app
          image: nginx
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: banana-app
  labels:
    app: example-app
spec:
  replicas: 5
  selector:
    matchLabels:
      app: example-app
  template:
    metadata:
      labels:
        app: example-app
    spec:
      containers:
        - name: banana-app
          image: jmalloc/echo-server
          env:
            - name: PORT
              value: '5678'
```

Đây là 2 manifest cho 2 service apple và banana. Service apple thì chạy nginx, default trang html hello world của nginx thôi. Còn Service banana thì chạy echo-server, là 1 API để báo lại thông tin của request và response, hồi nữa chạy thì các bạn sẽ thấy 2 kết quả trả về.

Nếu ở đây ai mới thấy kubernetes lần đầu sẽ hơi ngạc nhiên cách xử lý. Thì đây là cách chúng ta apply các thao tác thực thi lên kubernetes. Nãy giờ thì mình cũng đã dùng các manifest này nhưng giờ chém kỹ hơn tí.

Các file manifest này đóng vai trò là các bước để thực hiện cho các con agent. Thực hiện công việc gì thì có nhiều nha, ví dụ setup Container, Pod hay tạo Secret và xử lý Network, Load Balancer, Expose port ra cho bên ngoài xài service, v.v nói chung là nhiều.

Đi sâu hơn về 2 cài file trên thì mình xác định cho Agen là mình cần 1 cái Deployment, trong này thì mình gọi nó là banana-app và label là example-app. Ở đây để ý cái spec containers này, nó là chương trình sẽ được cái pod chạy. Thì setting ở đây là `jmalloc/echo-server` là 1 cái repository trên `docker hub` đây là 1 repository public công cộng, ai cũng có thể vô kéo về. Cơ chế hoạt động thì bạn nào sử dụng javascript node npm hay xài python pip hay rust cargo crate thì sẽ có hình dung tương tự ở đây. Nó là cái chỗ để kéo thông tin chương trình cần chạy về thôi.

Và thường để setting cho môi trường chạy chúng ta sẽ sử dụng các biến môi trường thay vì flag trên command line. Ở đây thì mình định ra cái PORT là 5678. Nhớ viết thành string vì nó là argument của command nên bắt buộc dạng string.

Rồi ở dòng 8 này, mình ra lệnh cho cụm kubernetes là cần 5 cái replicas là 5 bảng sao để chạy chương trình của mình. Các bạn có thể hình dung là cái service này sẽ xử lý nhiều tác vụ, 1 cục thì ko chạy nổi nên đôi khi mình sẽ phải scale lên số lượng lớn hơn. Thì nó sẽ được set ở đây. Cơ chế của Kubernetes thì có khả năng tự động xử lý việc nhân bảng này tinh tế hơn nhưng mà để demo cơ bản thì sẽ set tay chỗ này.

Ah và mấy cái replica này Kubernetes sẽ tự động phân bổ ra trên các con Agent ha, không phải chỉ nằm trên 1 máy. Và con Server sẽ điều phối việc xử lý công việc và xử lý các kết nối đối với các service này. Như tự động kết nối với các tài nguyên khác như DB. Tự động tổ chức mạng - ai cần mạng gì thì sử dụng mạng đó thôi, giảm bề mặt tấn công lại. Tự động bật tắt replica như nói hồi nãy.

Ok và bắt đầu chạy 2 cái Deployment này thì dùng lệnh mà nãy giờ vẫn sử dụng là `kubectl apply -f`

```bash
kubectl apply -f apple.yaml
kubectl apply -f banana.yaml
```

Ok chúng ta sẽ xem thử Kubernetes tạo các pod chạy deployment này ha. Thì đây 2 deployment này sẽ ra 10 pods là 10 cái replicas đó.

Và chúng ta có thể scale lên xuống tùy ý. Ví dụ thử scale con apple lên 10 pods và scale con banana lên 15 pods.

Là có tổng cộng 25 pods.

Chúng ta có thể xem tình hình các pods qua Kubernetes Dashboard là trực quan nhất. Nhg ai thích xài terminal thì có thể gõ.

```bash
kubectl get pods -o wide
```

Để xem tình hình các pods như thế nào. Ở đây các bạn cũng có thể thấy chúng đc deploy ở trên các node khác nhau. Chứ không nằm chung 1 chỗ. Lỡ Node này có vấn đề thì con Node kia vẫn chạy.

Và với setup như vầy thì các node có thể ở Cloud khác nhau luôn. Ví dụ thằn Google có bị Outage thì các node bên AWS vẫn chạy để phục vụ user mà không bị gián đoạn. (mở ngoặc xí, là có khi bị chậm, nhưng không gián đoạn nhe)

## Use k3s Load Balancer to expose the Agents

Ok các Deployment đã chạy mượt mà. Nhưng chúng ta vẫn chưa demo được cách tương tác với chúng.

Thường thì nếu service của các bạn ở dạng chạy liên tục không cần tương tác với bên ngoài thì tới đây là đủ. Như công ty cũ của mình các service chỉ lắng nghe MQTT, moi dữ liệu từ DB lên rồi xử lý tác vụ rồi ghi kết quả lên DB thôi, không tương tác với bên ngoài.

Nhưng mà thường thì các Services không như vậy, tụi nó cần phải có sự tương tác với bên ngoài thường là thông qua Request Response calls.

Bây giờ sẽ làm 1 cái Load Balancer để bên ngoài có thể tương tác với service ha.

Chúng ta có 2 service nên sẽ cần 2 cái Load Balancers. Với thằng apple chạy nginx thì bên trong container là cổng 80, mình sẽ expose ra 8080.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: example-loadbalancer
spec:
  type: LoadBalancer
  ports:
    - name: http
      port: 8080
      protocol: TCP
      targetPort: 80
  selector:
    app: example-app
  sessionAffinity: None
```

Còn thằng banana thì nãy set biến môi trường PORT là cổng 5678 thì sẽ expose ra công 8081.

Và cũng như nãy, Firewall của Google chặn 2 port 8080 và 8081 này nên chúng ta phải mở 2 port này ra trong [VPC Network]. Cũng vào đây, tạo 1 cái rule mới là `allow-k3s-services`, mở cho 2 port 8080-8081.

Rồi qua bên VM tag thêm 2 cái tag này vô cho VM là nó sẽ có hiệu lực.

Và bây giờ chúng ta có thể query vào trong các con Agent đang chạy service này rồi.

Thử service apple xem

```bash
curl http://<agent_ip>:8080
```

Thử service banana

```bash
curl http://<agent_ip>:8081
```

Ngon lành.

Các bạn cũng thấy, con banana nó trả về response là sẽ service đã được xử lý bằng con pod nào ở đây luôn.

Nếu tra ra thì nó là con này ha. Xem trên Kubernetes Dashboard cho dễ hình dung.

Trên Dashboard chúng ta cũng sẽ xem thêm được thông tin CPU và RAM mà mấy con pod đã sử dụng. Mình chạy thử spam mấy con pod này phát.

```bash
while true; do curl curl http://<agent_ip>:8081; done;
```

Lệnh trên sẽ spam liên tục cái endpoint con banana để xem mấy con pod chạy.

Nếu professional hơn thì xài tool để benchmark API chơi như apache benchmark (ab) hay wrk - tạm đọc là worker nha.

Chạy thử wrk nào.

```bash
wrk -t12 -c800 -d30s http://<agen_ip>:8081
```

Lệnh trên chạy wrk 12 thread 800 connection và duration là 30 giây để benchmark cái API.

Và đây là kết quả. Cũng OK serve được khoản <n> requests/sec. Là 1 cái mốc để cải tiến.

Cái này là đang benchmark trên 1 cái endpoint, 1 con agent thôi. Để improve thêm thì chúng ta làm 1 cái Load Balancer bên trên nữa để Load Balance giữa các con Agent với nhau sẽ cải thiện thêm tốc độ Requests/sec đó. Mà đó là một excercise thêm ha, trong video này sẽ không demo. Gợi ý là có thể sử dụng Nginx, traefik.io, hay Caddy.

## Conclusion

Ok, và thế là chúng ta có 1 cụm kubernetes để xài, để vọc, để học. Quá đã luôn.

Mình sẽ tiếp tục nghiên cứu thêm về cách sử dụng kubernetes. Đây chỉ là những bước cơ bản để dựng lên 1 cụm thôi. Còn xài nó như thế nào thì còn rất phức tạp để thành thạo.

Các kiến thức và ứng dụng mà mình đang định học trong tương lai sẽ là cách CICD cho cụm này. Để các ứng dụng mà mình code ra, push lên trên git sẽ được tự động test và deploy lên đây luôn.

Cảm ơn các bạn đã theo dõi tới đây. Xin chào và hẹn gặp lại. Chop Out. 🖖

