# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|name|string|null: false|
|email|string|null: false,unique:true|

### Association
- has_many :messages
- has_many :members
- has_many :groups through::members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|name|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :users through::members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|boby|text||
|image|string||

### Association
- belongs_to :user
- belongs_to :group



