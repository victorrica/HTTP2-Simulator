function MyIterator (o, key) {
   this.index = [];
   this.i = 0;
   this.o = o;

   for (var x in o) {
      this.index.push({ 'key': x, 'order': o[x][key] });
   }

   this.index.sort(function (a, b) {
      var as = a['order'],
          bs = b['order'];

      return as == bs ? 0 : (as > bs ? -1 : 1);
   });

   this.len = this.index.length;
}

MyIterator.prototype.next = function () {
   return this.i < this.len ?
          this.o[this.index[this.i++]['key']] :
          null;
};

