module github.com/khulnasoft/spidery/apps/go-sdk/spidery-go-examples

go 1.22.5

replace github.com/khulnasoft/spidery => ../

require (
	github.com/google/uuid v1.6.0
	github.com/khulnasoft/spidery/apps/go-sdk/spidery-go v0.0.0-00010101000000-000000000000
)

replace github.com/khulnasoft/spidery/apps/go-sdk/spidery-go => ../spidery-go
