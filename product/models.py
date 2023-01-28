from django.db import models

class ProductImg(models.Model):
    image   = models.ImageField(upload_to="product")

class ProductModel(models.Model):
    name    = models.CharField(verbose_name="제품명", max_length=100)
    price   = models.PositiveIntegerField(verbose_name="가격")
    sale    = models.PositiveIntegerField(verbose_name="할인 가격") # 2000을 1900에 팔려면 이 값이 100
    stock   = models.PositiveIntegerField(verbose_name="재고")
    images  = models.ForeignKey(ProductImg, on_delete=models.CASCADE, related_name="image", verbose_name="제품 사진")
    post    = models.TextField(verbose_name="글")
    created = models.DateField(verbose_name="생성날짜")

    def __str__(self):
        return self.name 

    class Meta:
        db_table = "product"
        verbose_name = "제품"
        verbose_name_plural = "상품"
