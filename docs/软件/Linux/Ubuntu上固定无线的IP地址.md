# 禁用 cloud-init 网卡管理

**禁用 cloud-init 的 netplan 控制**，自己写 `01-xxx.yaml`

```shell
sudo touch /etc/cloud/cloud-init.disabled
```

# 开启wifi功能

wifi功能默认是关闭的，需要手动开启

## 查看网卡驱动和wifi功能是否正常

```shell
lspci -knn | grep Net -A3
```

检查无线网卡是否被硬件或软件开关禁用

> sudo apt install rfkill

```shell
rfkill list
```

如果被锁定，使用以下命令解锁

````shell
sudo rfkill unblock wifi
````

## 打开wifi

```shell
sudo ip link set wlp1s0 up
```

查看可连接的wifi

> sudo apt install network-manager

```shell
nmcli device wifi list
```

连接方式一：连接到加密的WiFi（WPA/WPA2）

```shell
sudo nmcli device wifi connect "H3C_5C2658" password "kjiolluy711" ifname wlp1s0
```

连接方式二：连接到开放的WiFi

```shell
sudo nmcli device wifi connect "H3C_5C2658" ifname wlp1s0 --ask
```

连接方式三：通过配置文件连接并固定

```shell
sudo nano /etc/netplan/01-network-manager-all.yaml
```

```shell
network:
  version: 2
  renderer: NetworkManager
  wifis:
    wlp1s0:
      dhcp4: true
      access-points:
        "H3C_5C2658":
          password: "1234"
```

```shell
sudo netplan apply
```


# 固定IP
```shell
sudo nano /etc/netplan/01-network-manager-all.yaml
```

```shell
network:
  version: 2
  renderer: networkd  # 使用networkd或NetworkManager
  ethernets:
    enp2s0:  # 有线网卡名称（根据ip addr输出修改）
      dhcp4: no
      addresses: [192.168.124.28/24]  # 静态IP地址和子网掩码
      gateway4: 192.168.124.1  # 网关地址
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]  # DNS服务器地址
  wifis:
    wlp1s0:  # 无线网卡名称
      dhcp4: no
      addresses: [192.168.124.29/24]  # 静态IP地址
      gateway4: 192.168.124.1  # 网关地址
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]  # DNS服务器地址
      access-points:
        "H3C_5C2658":
          password: "1234"
```

```shell
sudo netplan generate  # 生成配置
sudo netplan apply     # 应用配置
```

# 验证连接

```shell
ip addr show  # 检查IP是否已更新
ping www.baidu.com  # 测试网络连通性
```

```shell
sudo reboot now
ip addr show
```











