# 命令行报告

## 安装

该报告端插件默认安装，不需要用户单独安装。

## 配置

```yaml
- name: cli
  pkg: htte-reporter-cli
  options:
    slow: 100 # 定义一个阈值，单位为毫秒，接口耗时超过这个时间表示它是慢接口，在报告时会标红其耗时。
```

## 屏幕快照

![snapshot](https://raw.githubusercontent.com/sigoden/htte/master/packages/htte-reporter-cli/images/snapshot.png)

## CI模式

当设置了环境变量 `HTTE_CI_MODE`, htte-reporter-cli 将禁用 `spinner` 并打印失败接口的错误信息