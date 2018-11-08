<template>
   	
	<div class="crontab disable">
		<div class="progress success ct-chart ct-perfect-fourth">
		</div>
		<div class="label success">{{crontabResult}}</div> 
	</div>
</template>

<script>
    module.exports = {
        mounted: function () {
            console.log("cheguei no pie");
        }
        
        ,
        data: function() {
            return {
                crontabResult: 'Sucesso'
            }
        }
        }


</script>

<style>
.ct-slice-pie {
 /* give your pie slices some outline or separate them visually by using the background color here */
  stroke: white;
  /* outline width */
  stroke-width: 4px;
}

 
.progress.success .ct-series-a .ct-slice-donut{
  stroke: #bbfbc3;
}

.progress.success .ct-series-b .ct-slice-donut{
  stroke: #Abfbc3;
}

.progress.success .ct-series-c .ct-slice-donut{
  stroke: #9bfbc3;
}

.progress.success .ct-series-d .ct-slice-donut{
  stroke: #82CD32;
}

.progress.success .ct-series-e .ct-slice-donut{
  stroke: #72CD32;
}

.progress.success .ct-series-f .ct-slice-donut{
  stroke: #6bfbc3;
}

.progress.success .ct-series-g .ct-slice-donut{
  stroke: #5bfbc3;
}

.progress.success .ct-series-h .ct-slice-donut{
  stroke: #4bfbc3;
}

.progress.success .ct-series-i .ct-slice-donut{
  stroke: #32CD32;
}

.progress.success .ct-series-j .ct-slice-donut{
  stroke: #22CD32;
}

.progress.fail .ct-series-a .ct-slice-donut{
  stroke: #ff9999;
}

.progress.fail .ct-series-b .ct-slice-donut{
  stroke: #ff8888;
}

.progress.fail .ct-series-c .ct-slice-donut{
  stroke: #ff7777;
}

.progress.fail .ct-series-d .ct-slice-donut{
  stroke: #ff6666;
}

.progress.fail .ct-series-e .ct-slice-donut{
  stroke: #ff5555;
}

.progress.fail .ct-series-f .ct-slice-donut{
  stroke: #ff4444;
}

.progress.fail .ct-series-g .ct-slice-donut{
  stroke: #ff3333;
}

.progress.fail .ct-series-h .ct-slice-donut{
  stroke: #ff2222;
}

.progress.fail .ct-series-i .ct-slice-donut{
  stroke: #ff1111;
}

.progress.fail .ct-series-j .ct-slice-donut{
  stroke: #ff0000 ;
}

</style>